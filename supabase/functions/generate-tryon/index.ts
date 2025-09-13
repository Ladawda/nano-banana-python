import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

interface TryOnRequest {
  sessionId: string
  bodyImageUrl: string
  garmentImages: string[]
  prompt?: string
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get Gemini API key
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY environment variable not set')
    }

    const { sessionId, bodyImageUrl, garmentImages, prompt }: TryOnRequest = await req.json()

    // Update session status to processing
    await supabase
      .from('try_on_sessions')
      .update({ 
        status: 'processing',
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)

    // Prepare the final prompt
    const numImages = garmentImages.length + 1 // body + garments
    const finalPrompt = prompt || (
      numImages === 2 
        ? "Create a professional quality studio shoot showing the person wearing the garment with better lighting and depth of field."
        : "Combine the person with the garments in a natural way, producing a new professional quality image."
    )

    // Download images and convert to base64
    const imageData = []
    
    // Add body image
    const bodyResponse = await fetch(bodyImageUrl)
    const bodyBuffer = await bodyResponse.arrayBuffer()
    const bodyMimeType = bodyResponse.headers.get('content-type') || 'image/jpeg'
    imageData.push({
      data: new Uint8Array(bodyBuffer),
      mimeType: bodyMimeType
    })

    // Add garment images
    for (const garmentUrl of garmentImages) {
      const garmentResponse = await fetch(garmentUrl)
      const garmentBuffer = await garmentResponse.arrayBuffer()
      const garmentMimeType = garmentResponse.headers.get('content-type') || 'image/jpeg'
      imageData.push({
        data: new Uint8Array(garmentBuffer),
        mimeType: garmentMimeType
      })
    }

    // Call Gemini API
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            ...imageData.map(img => ({
              inline_data: {
                mime_type: img.mimeType,
                data: btoa(String.fromCharCode(...img.data))
              }
            })),
            {
              text: finalPrompt
            }
          ]
        }],
        generationConfig: {
          response_mime_type: "image/jpeg"
        }
      })
    })

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`)
    }

    const geminiResult = await geminiResponse.json()
    
    if (!geminiResult.candidates?.[0]?.content?.parts?.[0]?.inline_data?.data) {
      throw new Error('No image data received from Gemini API')
    }

    const generatedImageData = geminiResult.candidates[0].content.parts[0].inline_data.data
    const imageBuffer = Uint8Array.from(atob(generatedImageData), c => c.charCodeAt(0))

    // Upload generated image to Supabase Storage
    const fileName = `tryon-${sessionId}-${Date.now()}.jpg`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: false
      })

    if (uploadError) {
      throw new Error(`Upload error: ${uploadError.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('generated-images')
      .getPublicUrl(fileName)

    const resultImageUrl = urlData.publicUrl

    // Update session with result
    await supabase
      .from('try_on_sessions')
      .update({ 
        status: 'completed',
        result_image_url: resultImageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)

    return new Response(
      JSON.stringify({ 
        success: true, 
        resultImageUrl,
        sessionId 
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )

  } catch (error) {
    console.error('Try-on generation error:', error)

    // Update session status to failed if we have sessionId
    const body = await req.clone().json().catch(() => ({}))
    if (body.sessionId) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      const supabase = createClient(supabaseUrl, supabaseKey)
      
      await supabase
        .from('try_on_sessions')
        .update({ 
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', body.sessionId)
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )
  }
})
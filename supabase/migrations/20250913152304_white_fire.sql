/*
  # Create users and image generation tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `height` (text)
      - `size` (text)
      - `body_image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `garments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `category` (text)
      - `brand` (text, optional)
      - `price` (text, optional)
      - `image_url` (text)
      - `is_wishlisted` (boolean)
      - `created_at` (timestamp)
    
    - `try_on_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `body_image_url` (text)
      - `garment_images` (jsonb array of image URLs)
      - `prompt` (text)
      - `result_image_url` (text, nullable)
      - `status` (text: 'pending', 'processing', 'completed', 'failed')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  height text DEFAULT '',
  size text DEFAULT '',
  body_image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create garments table
CREATE TABLE IF NOT EXISTS garments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  brand text DEFAULT '',
  price text DEFAULT '',
  image_url text NOT NULL,
  is_wishlisted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create try_on_sessions table
CREATE TABLE IF NOT EXISTS try_on_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  body_image_url text NOT NULL,
  garment_images jsonb NOT NULL DEFAULT '[]'::jsonb,
  prompt text NOT NULL,
  result_image_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE garments ENABLE ROW LEVEL SECURITY;
ALTER TABLE try_on_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Garments policies
CREATE POLICY "Users can read own garments"
  ON garments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own garments"
  ON garments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own garments"
  ON garments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own garments"
  ON garments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Try-on sessions policies
CREATE POLICY "Users can read own try-on sessions"
  ON try_on_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own try-on sessions"
  ON try_on_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own try-on sessions"
  ON try_on_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_try_on_sessions_updated_at
  BEFORE UPDATE ON try_on_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
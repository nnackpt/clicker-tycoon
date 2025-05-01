# AI Clicker Tycoon

A pixel-art styled clicker game with score accumulation, upgrades, customizable UI, and AI assistance built with Next.js 15.3.1 and Supabase.

## Features

- Click to earn points
- Spend points on upgrades to increase clicking power
- Background theme customization
- Auto-clickers for passive score generation
- AI advisor to provide tips
- User authentication and progress saving

## Tech Stack

- **Frontend**: Next.js 15.3.1 with TypeScript and TailwindCSS
- **Backend & Auth**: Supabase (Auth + Database)

## Setup

1. Clone the repository
   ```
   git clone https://github.com/nnackpt/clicker-tycoon.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a Supabase project and get your API keys
4. Create a `.env.local` file with the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. Set up the Supabase database with the following tables:

   ```sql
   CREATE TABLE user_progress (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       user_id UUID REFERENCES auth.users(id) NOT NULL,
       total_score INTEGER NOT NULL DEFAULT 0,
       score_per_click INTEGER NOT NULL DEFAULT 1,
       bg_theme TEXT NOT NULL DEFAULT 'default',
       ai_advisor BOOLEAN NOT NULL DEFAULT false,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Set up RLS policies
   ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Users can read their own progress"
       ON user_progress
       FOR SELECT
       USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own progress"
       ON user_progress
       FOR insert
       WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update their own progress"
       ON user_progress
       FOR update
       USING (auth.uid() = user_id);
   ```

6. Run the development server:

   ```
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) to see the game.

## Game Mechanics

1. **Basic Clicking**: Each click grants points based on your click power
2. **Shop System**: Use points to purchase various upgrades:
   - Click power upgrades to increase points per click
   - Background themes to change the game's appearance
   - Auto-clickers for passive income generation
   - AI advisor for helpful tips
3. **Progress Saving**: Your progress is automatically saved to your account

## License

This project is licensed under [nnackpt](https://github.com/nnackpt) License.

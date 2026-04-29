# Cinematic AI Portfolio

A modern, visually striking, and completely customizable portfolio application designed for UI/UX developers, artificial intelligence engineers, and creative technologists. Created with React, Tailwind CSS, Framer Motion, and a cinematic aesthetic.

## Features

- **Cinematic & Professional UI**: Carefully crafted with a mix of moody dark themes, purposeful typography (Inter & JetBrains Mono), and selective neon highlights.
- **Background Animations**: A smooth, responsive background featuring design inspiration that loops continuously for an immersive experience.
- **Real-Time Profile Settings**: Everything in the portfolio (Name, About, Education, Projects, Display Settings) is completely customizable through an integrated real-time settings panel.
- **Journey View**: High-impact UI cards displaying UI/UX milestones, design screens, and dashboards with slight zoom and modern glassmorphism.
- **Projects Showcase**: Interactive project cards revealing descriptions, tech stacks, and live links upon interaction.
- **Fully Responsive**: Adapts seamlessly to all screen sizes, from mobile devices to ultra-wide desktop monitors.
- **Toast Notifications & Interactive Links**: Thoughtful handling of external links (email, phone, LinkedIn, GitHub) ensuring valid platform routing and user feedback.

## Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

1. Set up dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the provided `localhost` (usually `http://localhost:3000`) in your browser to view the application.

## Customization

You can dynamically change the portfolio's content on the fly. 
- Click on the **Settings** icon located usually at the bottom-right of the screen to open the Profile Settings panel.
- Update your text profile details, images, project links, or UI theme modes instantly. Upload functionality is included for personal imagery, automatically updating the dashboard.

## Folder Structure

- `/src/components`: UI components forming the application logic
  - `/portfolio`: Feature-specific sections (Hero, About, Projects, ContactAndCerts)
  - `ProfileSettings.tsx`: The internal configuration panel
- `/src/lib`: Utilities and helpers
- `types.ts`: Global TypeScript typings for UserProfiles

## License

This project is open-source and free to be customized for personal use.

# Estospaces

A modern authentication system built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Login Page** - Sign in with Google or email options
- **Email Sign-in** - Email and password authentication with validation
- **Sign-up Page** - Create account with Google or email options
- **Email Sign-up** - Registration form with email and password validation
- **Password Reset** - Reset password via email flow
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Clean, minimalist design with orange accent color

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Main login page with Google and email options |
| `/login/email` | Email sign-in form with validation |
| `/signup` | Sign-up page with Google and email options |
| `/signup/email` | Email registration form with validation |
| `/reset-password` | Password reset request form |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## Project Structure

```
src/
├── app/
│   ├── login/
│   │   ├── page.tsx          # Main login page
│   │   └── email/
│   │       └── page.tsx      # Email sign-in page
│   ├── signup/
│   │   ├── page.tsx          # Main signup page
│   │   └── email/
│   │       └── page.tsx      # Email signup page
│   ├── reset-password/
│   │   └── page.tsx          # Password reset page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── page.tsx              # Home redirect
└── components/
    ├── AuthLayout.tsx        # Auth page layout wrapper
    ├── Button.tsx            # Reusable button component
    ├── GoogleButton.tsx      # Google sign-in button
    ├── Input.tsx             # Form input with validation
    ├── Logo.tsx              # Estospaces logo
    └── index.ts              # Component exports
```

## Design

The design features:
- Split-screen layout with architectural image on the left
- Clean white form area on the right
- Orange (#F97316) accent color for primary actions
- Error states with red borders and messages
- Responsive layout that stacks on mobile

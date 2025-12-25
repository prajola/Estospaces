# Estospaces

A modern authentication system built with Next.js 16, TypeScript, and Tailwind CSS with separate interfaces for Users and Property Managers.

## Features

- **Dual Interface** - Separate authentication flows for Users and Property Managers
- **User Portal** - Sign in/up to find and book properties
- **Property Manager Portal** - Sign in/up to list and manage properties
- **Form Validation** - Real-time validation with error states
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Clean, minimalist design with orange accent color

## Pages

### Landing Page
| Route | Description |
|-------|-------------|
| `/` | Choose between User or Property Manager |

### User Authentication
| Route | Description |
|-------|-------------|
| `/user/login` | User login with Google/email options |
| `/user/login/email` | User email sign-in form |
| `/user/signup` | User sign-up with Google/email options |
| `/user/signup/email` | User email registration form |
| `/user/reset-password` | User password reset |

### Property Manager Authentication
| Route | Description |
|-------|-------------|
| `/manager/login` | Property Manager login with Google/email options |
| `/manager/login/email` | Property Manager email sign-in form |
| `/manager/signup` | Property Manager sign-up with Google/email options |
| `/manager/signup/email` | Property Manager email registration (with company name) |
| `/manager/reset-password` | Property Manager password reset |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
git clone -b cursor/signup-and-login-pages-9a25 https://github.com/prajola/Estospaces.git
cd Estospaces
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
│   ├── page.tsx              # Landing page (User/Manager selection)
│   ├── user/
│   │   ├── login/
│   │   │   ├── page.tsx      # User login
│   │   │   └── email/
│   │   │       └── page.tsx  # User email sign-in
│   │   ├── signup/
│   │   │   ├── page.tsx      # User signup
│   │   │   └── email/
│   │   │       └── page.tsx  # User email signup
│   │   └── reset-password/
│   │       └── page.tsx      # User password reset
│   ├── manager/
│   │   ├── login/
│   │   │   ├── page.tsx      # Manager login
│   │   │   └── email/
│   │   │       └── page.tsx  # Manager email sign-in
│   │   ├── signup/
│   │   │   ├── page.tsx      # Manager signup
│   │   │   └── email/
│   │   │       └── page.tsx  # Manager email signup (with company name)
│   │   └── reset-password/
│   │       └── page.tsx      # Manager password reset
│   ├── layout.tsx
│   └── globals.css
└── components/
    ├── AuthLayout.tsx        # Auth page layout with user type badge
    ├── Button.tsx
    ├── GoogleButton.tsx
    ├── Input.tsx
    ├── Logo.tsx
    └── index.ts
```

## Design

The design features:
- Landing page to choose User or Property Manager path
- Split-screen layout with architectural image on the left
- User type badge (blue for User, purple for Property Manager)
- Orange (#F97316) accent color for primary actions
- Error states with red borders and messages
- Responsive layout that stacks on mobile

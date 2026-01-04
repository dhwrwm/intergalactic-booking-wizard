# 🚀 Intergalactic Booking Wizard

A modern, accessible, and production-ready booking wizard for space tourism built with Next.js 16, TypeScript, and Tailwind CSS.

> **🤖 AI-Assisted Development**: This project was built with the assistance of AI tools including [Augment VSCode Plugin](https://www.augmentcode.com/) and ChatGPT to accelerate development while maintaining high code quality and best practices.

## 📋 Table of Contents

- [Features](#-features)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [Key Design Decisions](#-key-design-decisions)
- [Development Approach](#-development-approach)
- [Feedback on Assignment](#-feedback-on-assignment)

## ✨ Features

- **Multi-step wizard flow**: Destination selection → Travelers → Review → Confirmation
- **State persistence**: Wizard state survives page refresh using sessionStorage
- **URL-based navigation**: Each step has its own URL for bookmarking and back button support
- **Comprehensive validation**: Client-side and server-side validation with helpful error messages
- **Accessibility first**: WCAG compliant with keyboard navigation, focus management, and ARIA labels
- **Responsive design**: Mobile-first approach with adaptive layouts
- **Type-safe**: Full TypeScript coverage with discriminated unions and branded types
- **Production-ready**: Error boundaries, loading states, and monitoring hooks

## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: Version 20.9.0 or higher
- **npm**, **yarn**, **pnpm**, or **bun**

### Local Development

1. **Clone the repository**

   ```bash
   git clone git@github.com:dhwrwm/intergalactic-booking-wizard.git
   cd intergalactic-booking-wizard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
intergalactic-booking-wizard/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── bookings/            # Booking submission endpoint
│   │   └── destinations/        # Destinations data endpoint
│   ├── booking/                 # Booking wizard pages
│   │   ├── BookingWizard.tsx   # Main wizard orchestrator
│   │   ├── BookingWizardContext.tsx  # State management
│   │   ├── StepProgressIndicator.tsx # Progress UI
│   │   ├── layout.tsx          # Wizard layout with provider
│   │   ├── page.tsx            # Wizard entry point
│   │   ├── error.tsx           # Error boundary
│   │   └── loading.tsx         # Loading state
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── components/
│   ├── atoms/                  # Basic building blocks
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Heading.tsx
│   │   └── Text.tsx
│   ├── molecules/              # Composite components
│   │   ├── DestinationCard.tsx
│   │   ├── TravelerCard.tsx
│   │   └── FormField.tsx
│   ├── booking/                # Wizard step components
│   │   ├── DestinationStep.tsx
│   │   ├── TravelersStep.tsx
│   │   ├── ReviewStep.tsx
│   │   └── ConfirmationStep.tsx
│   └── ui/                     # Shared UI components
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── date-picker.tsx
│       └── popover.tsx
├── hooks/                      # Custom React hooks
│   ├── useDestinations.ts     # Fetch destinations
│   └── useA11yAnnounce.ts     # Accessibility utilities
├── lib/                        # Business logic & utilities
│   ├── booking.ts             # Wizard state management
│   ├── constants.ts           # App-wide constants
│   ├── monitoring.ts          # Logging & analytics
│   └── utils.ts               # Utility functions
└── types/                      # TypeScript definitions
    └── booking.ts             # Domain types
```

## 🎯 Key Design Decisions

### 1. **State Management: Context API + Reducer Pattern**

Used React Context with `useReducer` instead of Redux/Zustand because:

- State is scoped to booking flow only
- Reducer pattern provides predictable, action-based updates
- Discriminated union of actions ensures type safety
- No external dependencies needed

### 2. **Component Architecture: Atomic Design Pattern**

Organized components into atoms → molecules → organisms for:

- **Reusability**: Atoms (Button, Input) compose into molecules (FormField)
- **Consistency**: Shared design system
- **Maintainability**: Clear component location and purpose

### 3. **URL-Based Navigation**

Used query parameters (`?step=destination`) for:

- Shareable URLs and bookmarking
- Browser back button support
- Step validation and redirects

### 4. **SessionStorage Persistence**

Chose sessionStorage over localStorage because:

- Session-scoped (clears when tab closes)
- Better privacy for booking data
- Instant state restoration on refresh

### 5. **Accessibility First (WCAG 2.1 AA)**

Built-in from the start:

- ✅ Keyboard navigation (Tab, Enter, Space, Arrow keys)
- ✅ Focus management on step transitions
- ✅ ARIA labels and semantic HTML
- ✅ Screen reader announcements

## 🛠️ Development Approach

### Process

1. **Planning** → Analyzed requirements, sketched component hierarchy
2. **Foundation** → Set up Next.js 16 + TypeScript + Tailwind, built atomic components
3. **Features** → Implemented wizard steps, state management, API routes
4. **Polish** → Added accessibility, error handling, type safety improvements
5. **Production** → Error boundaries, monitoring hooks, session persistence

### Key Tools

- **Next.js 16** - App Router, API routes, SSR
- **TypeScript** - Type safety and better refactoring
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **date-fns** - Lightweight date manipulation
- **react-day-picker** - Accessible calendar component

## 💭 Feedback on Assignment

### What I Enjoyed

- Clear evaluation criteria defining "production-ready"
- Creative space tourism theme
- Real-world complexity (multi-step wizard, validation, accessibility)

---

## 🚀 Next Steps for Production

- **Testing**: Unit (Vitest), integration (Testing Library), E2E (Playwright)
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Monitoring**: Sentry for errors, analytics for performance

---

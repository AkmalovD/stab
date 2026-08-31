# STAB - Study Abroad Budget Planner

A comprehensive web application to help students plan their study abroad journey by comparing living costs, finding universities, and connecting with the student community.

## Features

- **City Comparison**: Compare living costs across different cities and countries
- **Cost Calculator**: Calculate detailed monthly expenses including housing, food, transport, and more
- **Currency Converter**: Convert currencies in real-time
- **University Finder**: Discover top universities and their tuition fees
- **Scholarship Search**: Find available scholarships and funding opportunities
- **Student Community**: Connect with other students and get advice

## Tech Stack

- **Framework**: Next.js 15.0.0 with App Router
- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS 3.4.4
- **Authentication**: Firebase Auth
- **Backend**: Firebase Data Connect
- **Notifications**: Sonner
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod
- **Code Quality**: ESLint + Prettier

## Project Structure

```
frontend/
├── app/                     # Next.js App Router pages
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── login/              # Authentication pages
│   ├── sign-up/
│   ├── reset-password/
│   ├── profile/            # User profile page
│   ├── budget/             # Budget planning page
│   ├── compare/            # City comparison page
│   ├── plan-journey/       # Journey planning page
│   ├── scholarships/       # Scholarships page
│   └── community/          # Community page
├── src/
│   ├── auth/               # Firebase authentication
│   │   ├── AuthContext.tsx
│   │   ├── firebase.ts
│   │   ├── login.ts
│   │   ├── register.ts
│   │   ├── resetPassword.ts
│   │   └── socialAuth.ts
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── CityCard.tsx
│   │   ├── CityComparison.tsx
│   │   ├── CostBreakdown.tsx
│   │   ├── CurrencyConverter.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ... (more components)
│   ├── types/              # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── user.ts
│   │   ├── city.ts
│   │   ├── scholarship.ts
│   │   └── ... (more types)
│   ├── utils/              # Utility functions
│   │   ├── calculations.ts
│   │   ├── data.ts
│   │   └── ... (more utils)
│   ├── validators/         # Zod validation schemas
│   │   ├── loginInputSchema.ts
│   │   ├── registerInputSchema.ts
│   │   └── resetPasswordSchema.ts
│   ├── services/           # API services
│   │   └── profileApi.ts
│   └── dataconnect-generated/  # Firebase Data Connect generated code
├── public/                 # Static assets
│   ├── fonts/              # SF Pro Display font files
│   └── logo.svg
├── dataconnect/            # Firebase Data Connect configuration
│   ├── schema/
│   └── dataconnect.yaml
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.mjs
└── .env.example            # Environment variables template
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd STAB
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then fill in your Firebase configuration values in `.env.local`.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier

## Key Features Explained

### City Data Management
The application includes comprehensive data for major study destinations:
- **Cities**: Toronto, London, Berlin, Sydney, Tokyo, New York
- **Cost Categories**: Housing, food, transport, entertainment, utilities
- **Metadata**: University count, student population, language, timezone

### Currency Conversion
Real-time currency conversion with support for:
- USD, EUR, GBP, CAD, AUD, JPY
- Formatted display with proper currency symbols
- Exchange rate calculations (mock data for demo)

### TypeScript Integration
- Comprehensive type definitions for all data structures
- Strict typing for component props and state
- Enhanced developer experience with IntelliSense

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Optimized for all device sizes

## Architecture Decisions

### Easy Refactoring
The codebase is structured for easy refactoring with:
- **Modular Components**: Each component has a single responsibility
- **Centralized Types**: All TypeScript interfaces in one location
- **Utility Functions**: Reusable business logic separated from UI
- **Data Layer**: City data and search functions centralized
- **Consistent Naming**: Clear, descriptive names throughout

### Scalability
- Component-based architecture allows easy addition of new features
- Utility functions can be extended without affecting UI components
- Type definitions support adding new data fields
- Routing structure supports additional pages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React community for excellent documentation
- Tailwind CSS for the utility-first CSS framework
- TypeScript for enhanced developer experience
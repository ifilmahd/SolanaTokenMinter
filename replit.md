# Solana Token Generator

## Overview

This is a full-stack web application for creating and deploying SPL tokens on the Solana blockchain. The application features a modern dark-themed UI built with React and shadcn/ui components, with an Express.js backend that handles token creation and mock deployment functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Solana-themed dark mode
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with custom configuration for monorepo structure

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Hot reload with tsx and Vite middleware integration
- **Storage**: In-memory storage implementation with interface for future database integration
- **API**: RESTful endpoints for token management

### Data Storage
- **Current Implementation**: In-memory storage using Maps for development
- **Prepared for**: PostgreSQL with Drizzle ORM (schema defined but not yet connected)
- **Database Provider**: Configured for Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle migrations with PostgreSQL dialect

## Key Components

### Database Schema (shared/schema.ts)
- **Users Table**: Authentication and user management
- **Tokens Table**: Token metadata, deployment status, and blockchain addresses
- **Validation**: Zod schemas for type-safe data validation

### API Endpoints (server/routes.ts)
- `POST /api/tokens` - Create new token
- `GET /api/tokens/wallet/:address` - Fetch tokens by wallet address  
- `POST /api/tokens/:id/deploy` - Deploy token to blockchain (mock implementation)

### Frontend Components
- **WalletConnection**: Mock wallet integration with address generation
- **TokenForm**: Form for token metadata input with validation
- **TokenPreview**: Real-time preview of token configuration
- **DeploymentModal**: Loading state during token deployment
- **SuccessModal**: Deployment confirmation with blockchain links

### UI/UX Features
- Custom Solana-themed color palette (purple, green, mint)
- Responsive design with mobile-first approach
- Dark mode with CSS custom properties
- Animated loading states and transitions
- Form validation with error handling

## Data Flow

1. **Wallet Connection**: User connects mock wallet, generates random address
2. **Token Configuration**: User fills form with token details (name, symbol, supply, etc.)
3. **Real-time Preview**: Form data updates token preview in real-time
4. **Validation**: Client-side validation with Zod schemas
5. **API Request**: Form submission creates token record via REST API
6. **Mock Deployment**: Simulated blockchain deployment with generated addresses
7. **Success Feedback**: Display deployment results with blockchain explorer links

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for production
- **drizzle-orm & drizzle-kit**: Type-safe database operations and migrations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **zod**: Runtime type validation and schema definition

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives (35+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Variant-based component styling
- **lucide-react**: Modern icon library

### Development Dependencies
- **vite**: Fast build tool with HMR
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Port**: 5000 (configured in .replit)
- **Hot Reload**: Vite middleware integration with Express
- **Database**: In-memory storage for rapid development

### Production Build
- **Frontend Build**: `vite build` → `dist/public/`
- **Backend Build**: `esbuild server/index.ts` → `dist/index.js`
- **Start Command**: `node dist/index.js`
- **Environment**: NODE_ENV=production

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Deployment Target**: Autoscale
- **Port Mapping**: 5000 → 80
- **Workflows**: Parallel execution with automatic startup

## Changelog
- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
# CRM Pro - Business Management System

A comprehensive CRM application with HR and Inventory Management built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **CRM Management**: Customers, Leads, Sales Pipeline
- **HR Management**: Employees, Attendance, Payroll
- **Inventory Management**: Products, Stock, Suppliers, Reports
- **Modern UI**: Built with shadcn/ui components
- **Blue & White Theme**: Professional color scheme
- **Turbopack**: Fast development and build times

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

#### Turbopack Development Server (Default - Recommended)
```bash
npm run dev
```

#### Standard Development Server (Fallback)
```bash
npm run dev:standard
```

Turbopack provides:
- ⚡ **10x faster** development server startup
- 🔄 **Instant hot reloads**
- 📦 **Faster builds**
- 🎯 **Incremental compilation**

### Building for Production

#### Standard Build
```bash
npm run build
```

#### Turbopack Build (Recommended)
```bash
npm run build:turbo
```

### Starting Production Server
```bash
npm start
```

## Demo Credentials

- **Email**: `admin@crmpro.com`
- **Password**: `admin123`

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Bundler**: Turbopack (experimental)

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── crm/               # CRM modules
│   ├── hr/                # HR modules
│   ├── inventory/         # Inventory modules
│   ├── login/             # Authentication
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── auth/             # Authentication components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Performance Optimizations

- **Turbopack**: Fast bundling and development
- **CSS Optimization**: Automatic CSS minification
- **Package Optimization**: Optimized imports for large packages
- **Image Optimization**: WebP and AVIF support
- **Tree Shaking**: Unused code elimination

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

## License

© 2024 CRM Pro. All rights reserved. 
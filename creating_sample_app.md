# Emergency Response Web App

A mobile-friendly web application designed to connect citizens with emergency responders and community helpers. The app features a guided chat interface with voice input capabilities and quick-access buttons for common requests.

## Features

### Landing Page
- Intuitive user type selection (Citizens, Responders, Helpers)
- Clean, responsive design with app logo
- Color-coded interface for different user types
  - Red: Citizens
  - Blue: Emergency Responders
  - Green: Community Helpers

### Chat Interface
- Real-time messaging system
- Voice input support
- Quick-access buttons for common queries
- User-specific interfaces for each role
- Emergency call button
- Navigation to return to landing page

## Technical Stack

- React 18+
- Vite (Build tool)
- Tailwind CSS (Styling)
- shadcn/ui (UI Components)
- Lucide React (Icons)

## Installation Guide

### Prerequisites
- Node.js 16+
- npm 7+

### Step 1: Project Setup
```bash
# Create a new React project using Vite
npm create vite@latest emergency-app -- --template react
cd emergency-app
```

### Step 2: Install Dependencies
```bash
npm install @radix-ui/react-slot
npm install @radix-ui/react-card
npm install class-variance-authority
npm install clsx
npm install lucide-react
npm install tailwindcss
npm install postcss
npm install autoprefixer
```

### Step 3: Configure Tailwind CSS
Create and configure the Tailwind configuration file:

```bash
npx tailwindcss init -p
```

Replace the content in `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 4: Project Structure
Create the following directory structure:
```
src/
├── components/
│   └── ui/
│       ├── button.jsx
│       └── card.jsx
├── lib/
│   └── utils.js
├── App.jsx
└── index.css
```

### Step 5: Component Setup

#### Create Button Component (`src/components/ui/button.jsx`):
```javascript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
```

#### Create Card Component (`src/components/ui/card.jsx`):
```javascript
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }
```

#### Create Utils File (`src/lib/utils.js`):
```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

#### Update CSS (`src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 6: Running the Application
```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or similar port).

## Troubleshooting

Common issues and solutions:

1. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for missing CSS imports
   - Restart the development server

2. **Component Errors**
   - Verify all dependencies are installed
   - Check import paths
   - Ensure components are properly exported/imported

3. **Build Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for Node.js version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements

- [ ] Backend integration
- [ ] Real-time chat functionality
- [ ] User authentication
- [ ] Push notifications
- [ ] Offline support
- [ ] Analytics dashboard
- [ ] Multi-language support

## License

[Add your license here]

## Contact

[Add your contact information here]

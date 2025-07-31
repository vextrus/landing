# Vextrus Landing Page

> 🏗️ Bangladesh's First AI-Powered ERP System for Real Estate Construction

A sophisticated, interactive landing page showcasing the Vextrus ERP ecosystem with advanced 2D visualizations, AI demonstrations, and Bangladesh-specific features.

![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4)

## 🎯 Overview

Vextrus transforms traditional real estate construction operations into intelligent, automated, and profitable enterprises through advanced AI and modern technology. This landing page demonstrates how Vextrus helps construction companies:

- 🚀 Reduce project delays by 45%
- 💰 Increase profitability by 20%
- 🎯 Achieve 95% on-time completion rate
- 🔒 Ensure 100% financial transparency

## ✨ Key Features

### Revolutionary Orbital2D Design System
- **Orbital Neural Network**: Groundbreaking visualization with modules orbiting around AI Command Center
- **Physics-Based Animations**: Natural motion with spring physics and gravitational effects
- **Dynamic Energy Flow**: Bi-directional particle streams showing real-time data connections
- **Glass Morphism UI**: Premium visual design with depth and transparency
- **Smart Positioning**: Avoids cardinal directions for perfect gradient rendering

### Module Demonstrations

#### 🏢 AI Command Center (Completely Transformed - V4)
- **Full-Screen Modal Experience**: Professional ERP interface separated from landing page
- **Modern UI Components**: GlassCard, AnimatedButton, FloatingInput, AnimatedChart
- **Multiple Dashboard Views**: 
  - Dashboard with customizable grid layout
  - Sites view with Stadia Maps integration
  - Timeline with AI predictions
  - Analytics with data visualizations
  - Settings for complete user management
- **Real-time Features**: WebSocket simulation, live activity feed
- **Dark/Light Theme**: Full theme support with smooth transitions
- **Voice command interface** (Bengali/English)
- **Live construction site map** of Dhaka (Bashundhara R/A, Jolshiri Abashon)

#### 💰 Financial Suite
- 90-day cash flow predictor
- bKash/Nagad payment integration
- Smart invoice processing
- Real-time financial metrics

#### 🏗️ Additional Modules
- Sales & CRM
- Procurement & Vendor Management
- Quality Control
- HR & Workforce Management
- Analytics & Business Intelligence

### Bangladesh-Specific Features
- 🇧🇩 Bengali language support
- 💵 BDT currency with Crore/Lakh formatting
- 🏛️ RAJUK compliance tracking
- 🌧️ Monsoon season planning
- 📍 Local area references (Gulshan, Dhanmondi, Uttara)

## 📋 Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd vextrus-landing
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Create .env.local with the following content:
echo "NEXT_PUBLIC_STADIA_MAPS_API_KEY=eb887465-72f0-4e02-9d92-6e68a62c5719" > .env.local
```

4. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
vextrus-landing/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── hero/              # Hero section
│   ├── sections/          # Page sections
│   └── ui/                # Base UI components
├── lib/                   # Utilities
├── styles/                # Global styles
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🎨 Orbital2D Design System

### Core Philosophy
The Orbital2D design represents a paradigm shift in ERP visualization, using gravitational UI patterns where data relationships are visualized as orbital mechanics.

### Visual Elements
- **Central AI Hub**: Combined AI Brain + Command Center (48x48 container)
- **Orbital Modules**: 6 modules positioned at safe angles (-75°, -15°, 45°, 105°, 165°, 225°)
- **Energy Connections**: Animated particle beams with gradient flow
- **Aurora Background**: Multi-layer neural grid atmosphere

### Color System
- **Module Colors**:
  - Financial: Teal (#14B8A6)
  - Sales: Green (#22C55E)
  - Procurement: Amber (#F59E0B)
  - Quality: Purple (#8B5CF6)
  - HR: Red (#EF4444)
  - Analytics: Cyan (#06B6D4)

### Animation Patterns
- **Hover Effects**: 3D tilt with 1.12x scale
- **Energy Particles**: 6-second bi-directional flow
- **Orbital Rings**: 10s/15s counter-rotation
- **Spring Physics**: Natural motion dynamics

### Typography
- **Headlines**: Inter (700, 800)
- **Body**: Inter (400, 500)
- **Data**: Roboto Mono

## 🚀 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # Run TypeScript checking
npm run lint         # Run ESLint
```

## 🤖 AI-Enhanced Development

This project is configured with 6 MCP (Model Context Protocol) servers for enhanced AI capabilities:

- **context7**: Conversation context and memory management
- **sequential-thinking**: Step-by-step problem solving
- **playwright**: Browser automation and testing
- **serena**: Semantic code search and refactoring
- **consult7**: Large file analysis with Google Gemini 2.5 Pro
- **claude-mcp**: Enhanced Claude Code operations

To use these capabilities, start Claude Code with:
```bash
claude                    # MCP servers auto-load
claude --mcp-debug       # Debug mode for troubleshooting
```

See [MCP_SERVERS.md](MCP_SERVERS.md) for detailed configuration.

## 📱 Key Sections

1. **Hero Section**: Split-screen transformation animation
2. **Problem Visualizer**: Animated infographics showing industry challenges
3. **Solution Overview**: Three-pillar architecture presentation
4. **Orbital2D Ecosystem**: Revolutionary module visualization with orbital mechanics
5. **ROI Calculator**: Dynamic calculation tool with real-time charts
6. **CTA Section**: Multiple engagement options

## 🔧 Technologies Used

- **Next.js 15.4**: React framework with app router
- **React 19**: Latest React with compiler support
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Utility-first CSS
- **Framer Motion**: Animations
- **React Spring**: Physics-based animations
- **Lucide React**: Icons
- **@tsparticles/react**: Particle effects
- **@formkit/auto-animate**: Automatic layout animations

## 📈 Performance

- Lighthouse Score: 95+
- First Contentful Paint: <1s
- Time to Interactive: <2s
- Cumulative Layout Shift: <0.1

## 🚢 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## 📝 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Orbital2D Design System](docs/ORBITAL2D_DESIGN_SYSTEM.md)
- [Animation Guide](docs/ANIMATION_GUIDE.md)
- [Technical Implementation](docs/ORBITAL2D_IMPLEMENTATION.md)
- [MCP Servers Configuration](MCP_SERVERS.md)
- [Claude.md - AI Development Guide](CLAUDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Vextrus.

## 📞 Contact

- Website: [vextrus.ai](https://vextrus.ai)
- Email: hello@vextrus.ai
- Location: Dhaka, Bangladesh

---

Built with ❤️ for Bangladesh's construction industry
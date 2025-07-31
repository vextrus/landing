# Changelog

All notable changes to the Vextrus Landing Page project will be documented in this file.

## [1.4.0] - 2025-07-30

### AI Command Center V4 - Ultimate ERP Transformation

#### Added
- **Full-Screen Modal System**
  - Professional loading sequence with orbital animations
  - Smooth enter/exit transitions with backdrop blur
  - Portal rendering for proper z-index management
  - CommandCenterWrapper component for modal trigger

- **Modern UI Component Library**
  - `GlassCard`: Advanced glass morphism with noise texture overlay
  - `AnimatedButton`: Spring physics, ripple effects, multiple variants
  - `FloatingInput`: Material Design-inspired floating labels
  - `AnimatedChart`: Recharts integration with glass morphism tooltips

- **Settings View**
  - Complete user preferences management
  - Profile information editing
  - Theme selection (Light/Dark/System)
  - Accent color customization
  - Notification preferences
  - Localization settings

- **Environment Configuration**
  - Stadia Maps API integration
  - `.env.local` setup documentation

#### Fixed
- Navigation system - added missing SettingsView import
- Dark mode CSS classes with Tailwind CSS v4 variant configuration
- TypeScript errors in UI components
- Build errors with proper component imports

#### Changed
- Command Center now loads in full-screen modal instead of inline
- Updated MetricCard to use new GlassCard component
- Enhanced theme system with next-themes integration
- Improved loading states for all views

#### Technical Improvements
- Dynamic imports for all dashboard views
- Error boundaries for resilience
- React.memo optimization for widgets
- Spring physics animations throughout
- 60fps performance optimizations

## [1.3.0] - 2025-07-29

### AI Command Center V3 - Modern Dashboard Implementation

#### Added
- Light/Dark mode with next-themes
- Stadia Maps integration for live map
- Drag-and-drop dashboard with react-grid-layout
- Multiple dashboard views (Sites, Timeline, AI Insights, Analytics)
- Enhanced mobile UX with responsive layouts

## [1.2.0] - 2025-07-28

### Orbital2D Design System

#### Added
- Revolutionary orbital neural network visualization
- Physics-based particle animations
- Glass morphism cards with gradient borders
- Central AI Command Center hub
- Dynamic connection beams between modules

#### Changed
- Replaced hexagonal grid with orbital layout
- Merged AI Core and Command Center into single central hub
- Updated module positioning to avoid gradient rendering issues

## [1.1.0] - 2025-07-25

### 2D Architecture Implementation

#### Added
- Honeycomb grid for module visualization
- Data flow particle animations
- 2D AI brain visualization
- Interactive module selection system

#### Removed
- 3D visualizations for better performance

## [1.0.0] - 2025-07-20

### Initial Release

#### Features
- Hero section with split-screen animation
- Problem visualization with cost counters
- Solution overview with three pillars
- 7 interactive ERP modules
- ROI calculator with dynamic charts
- Bangladesh-specific features throughout
- Navigation and footer
- Mobile responsive design
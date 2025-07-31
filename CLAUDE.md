# CLAUDE.md - AI Development Guidelines for Vextrus 🤖

This file provides comprehensive guidance to Claude Code (claude.ai/code) and other AI assistants when working with the Vextrus codebase. It emphasizes using multiple MCP servers and advanced thinking modes for optimal results.

## 🎯 Project Overview

Vextrus is an AI-powered ERP system landing page specifically designed for real estate construction companies in Bangladesh. The project showcases Vextrus's capabilities through an interactive, visually stunning landing page with advanced 2D visualizations.

### Key Achievements ✅ COMPLETED
- **Orbital2D Design System**: Revolutionary circular UI pattern with glass morphism
- **Complete ERP Ecosystem**: 7 modules (6 enhanced + Command Center) with full functionality
- **Enterprise-Grade Modules**: All modules upgraded to match Command Center excellence
- **AI-Powered Intelligence**: NLP insights, predictive modeling, ML forecasting
- **Bangladesh Localization**: BDT currency, local banks, construction compliance
- **Glass Morphism UI**: Consistent design system across all 27+ views
- **Production Ready**: Successfully built and optimized (166KB first load)

## 🚀 MCP Server Strategy - ALWAYS USE MULTIPLE SERVERS

### Core Principle: Combine Multiple MCP Servers for Best Results

When working on ANY task, you should leverage multiple MCP servers in combination:

#### 1. **Planning Phase** - Use Together:
```
- mcp__sequential-thinking__sequentialthinking: Break down complex tasks
- mcp__serena__*: Explore codebase structure
- mcp__consult7__consultation: Analyze multiple files with Gemini
- mcp__context7__*: Get library documentation
```

#### 2. **Implementation Phase** - Combine:
```
- mcp__serena__*: Make precise code edits
- mcp__claude-mcp__*: Review and improve code quality
- mcp__playwright__*: Test UI interactions
- TodoWrite: Track progress systematically
```

#### 3. **Debugging Phase** - Use All:
```
- mcp__consult7__consultation: Analyze error patterns across files
- mcp__serena__search_for_pattern: Find specific issues
- mcp__sequential-thinking: Think through solutions
- Bash: Run tests and verify fixes
```

### Example Multi-Server Workflow:

```typescript
// Step 1: Use sequential-thinking to plan
mcp__sequential-thinking__sequentialthinking({
  thought: "Breaking down the dashboard implementation into steps...",
  totalThoughts: 5
})

// Step 2: Use consult7 to analyze existing patterns
mcp__consult7__consultation({
  path: "/components",
  pattern: "*.tsx",
  query: "Find all dashboard components and their patterns",
  model: "gemini-2.5-flash|thinking"
})

// Step 3: Use serena for precise edits
mcp__serena__replace_symbol_body({
  name_path: "DashboardComponent",
  body: "// New implementation"
})

// Step 4: Use claude-mcp to review
mcp__claude-mcp__review_code({
  code: "// Component code",
  focus_areas: "performance, accessibility"
})
```

## 💡 Ultrathink Mode - ACTIVATE FOR COMPLEX TASKS

### When to Use Ultrathink Mode:
1. **Architecture Decisions**: Designing new components or systems
2. **Complex Debugging**: Multi-file issues or performance problems
3. **Integration Tasks**: Connecting multiple modules or services
4. **Optimization**: Performance, bundle size, or UX improvements

### How to Activate Ultrathink:
- Add `|thinking` suffix to Gemini models: `gemini-2.5-flash|thinking`
- Use `mcp__sequential-thinking` for step-by-step reasoning
- Combine with `mcp__consult7` for deep file analysis

### Ultrathink Example:
```typescript
// Analyzing complex performance issue
mcp__consult7__consultation({
  model: "gemini-2.5-pro|thinking", // Ultrathink activated
  query: "Analyze render performance bottlenecks and suggest optimizations",
  pattern: "**/*.tsx"
})
```

## 🏗️ Technology Stack

### Frontend Framework
- **Next.js 15.4.4**: App Router, Server Components
- **React 19.1.0**: Latest features with compiler
- **TypeScript 5.7.3**: Strict mode enabled

### Styling & Animation
- **Tailwind CSS v4**: CSS-based configuration
- **Framer Motion**: Layout animations, gestures
- **React Spring**: Physics-based animations
- **CSS Animations**: Orbital rotations, glass shimmer

### Data Visualization
- **Recharts**: Charts with glass morphism theme
- **MapLibre GL**: Interactive construction site maps
- **Three.js**: 3D visualizations (via React Three Fiber)

### Development Tools
- **6 MCP Servers**: AI-enhanced development
- **Playwright**: E2E testing
- **ESLint**: Code quality
- **Prettier**: Code formatting

## 📁 Project Structure

```
vextrus-landing/
├── app/                              # Next.js app directory
│   ├── layout.tsx                   # Root layout with OrbitalNavigation
│   ├── page.tsx                     # Landing page with all sections
│   └── test-command-center/         # Command Center test route
├── components/
│   ├── ecosystem/                   # ERP Ecosystem components
│   │   ├── VextrusEcosystem2D.tsx  # Main ecosystem visualization
│   │   ├── core/                   # Core visual components
│   │   │   ├── AIBrainCenter.tsx   # Central AI hub
│   │   │   ├── OrbitalGrid.tsx     # Orbital positioning system
│   │   │   └── BeamConnectionFlow.tsx # Energy connections
│   │   └── modules/                # Individual modules (7 total)
│   │       ├── CommandCenter/      # AI Command Center (original)
│   │       ├── FinancialSuite/     # AI Financial Intelligence
│   │       ├── SalesCRM/           # AI Sales & Lead Management  
│   │       ├── Procurement/        # AI Supply Chain Management
│   │       ├── QualityControl/     # AI Quality Assurance
│   │       ├── HRWorkforce/        # AI Workforce Management
│   │       └── AnalyticsBI/        # AI Business Intelligence
│   ├── hero/                       # Hero sections
│   │   └── OrbitalHeroSection.tsx  # Orbital design hero
│   ├── sections/                   # Landing page sections
│   │   ├── OrbitalProblemSection.tsx
│   │   ├── OrbitalSolutionSection.tsx
│   │   ├── OrbitalAIShowcase.tsx
│   │   └── OrbitalCTASection.tsx
│   └── shared/
│       ├── orbital/                # Orbital design system
│       │   ├── OrbitalBackground.tsx
│       │   ├── GlassCard.tsx
│       │   ├── OrbitalModule.tsx
│       │   └── BeamConnection.tsx
│       └── ecosystem/              # ERP shared components
│           ├── ModuleWrapper.tsx   # Full-screen modal wrapper
│           └── ui/                 # Shared UI component library
│               ├── GlassCard.tsx   # Glass morphism cards
│               ├── AnimatedButton.tsx # Interactive buttons
│               ├── AnimatedCounter.tsx # Number animations
│               ├── AnimatedChart.tsx # Data visualizations
│               ├── FloatingInput.tsx # Glass input fields
│               └── LoadingSkeleton.tsx # Loading states
├── styles/
│   └── globals.css                 # Tailwind v4 + animations
└── docs/                          # Documentation
```

## 🎨 Design System - Orbital2D

### Core Components
1. **OrbitalBackground**: Aurora, neural, gradient, particles
2. **GlassCard**: Premium glass morphism with variants
3. **OrbitalModule**: Reusable orbital component
4. **BeamConnection**: Animated energy connections

### Design Principles
- **Orbital Layouts**: Circular/radial arrangements
- **Glass Morphism**: Blur, transparency, gradients
- **Spring Physics**: Natural motion dynamics
- **Neural Aesthetics**: Connection beams, particles

### Color Palette
```css
--primary: #0F172A;      /* Deep Space Blue */
--accent: #14B8A6;       /* Cosmic Teal */
--success: #22C55E;      /* Aurora Green */
--warning: #F59E0B;      /* Solar Amber */
--glass-white: rgba(255, 255, 255, 0.98);
--glass-dark: rgba(15, 23, 42, 0.98);
```

## 🛠️ Common Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript checking
npm run test:e2e        # Playwright tests

# Analysis
npm run analyze         # Bundle analysis
```

## 🧠 AI Development Best Practices

### 1. Always Start with MCP Servers
```typescript
// DON'T just edit files directly
// DO use MCP servers to understand context first

// Good approach:
1. mcp__serena__get_symbols_overview() // Understand structure
2. mcp__consult7__consultation()        // Analyze patterns
3. mcp__serena__replace_symbol_body()   // Make changes
4. mcp__claude-mcp__review_code()       // Verify quality
```

### 2. Use TodoWrite for Complex Tasks
- Break down tasks into manageable steps
- Track progress systematically
- Mark items complete as you go
- Update priorities based on discoveries

### 3. Leverage Ultrathink for Architecture
- Design component hierarchies
- Plan state management
- Optimize performance
- Debug complex issues

### 4. Test Everything
- Use Playwright for UI testing
- Run build after changes
- Check TypeScript errors
- Verify responsive design

## 🇧🇩 Bangladesh-Specific Considerations

### Currency Formatting
```typescript
// Always use BDT with Crore/Lakh
formatCurrency(23280000000) // "৳2,328 Cr"
formatCurrency(4500000)     // "৳45 Lakh"
```

### Construction Terminology
- Use "floors" not "stories"
- "RCC" for reinforced concrete
- "Rod" for steel reinforcement
- Include monsoon considerations

### Map Integration
- Center on Dhaka by default
- Include local landmarks
- Use Bengali transliterations

## 🚀 Performance Guidelines

### Target Metrics
- **First Load JS**: < 200KB per route
- **Time to Interactive**: < 1.5 seconds
- **Lighthouse Score**: 95+
- **Animation FPS**: 60fps constant

### Optimization Strategies
1. **Code Splitting**: Dynamic imports for heavy components
2. **Image Optimization**: Next.js Image with proper sizing
3. **Font Loading**: Subset and preload critical fonts
4. **CSS**: Tailwind v4 with zero runtime JS
5. **Memoization**: React.memo for expensive renders

## 📝 Documentation Standards

### When Creating/Updating Docs:
1. Use clear headings with emojis
2. Include code examples
3. Explain the "why" not just "what"
4. Keep it concise but comprehensive
5. Update related docs together

### Required Documentation:
- Component purpose and usage
- Props with TypeScript types
- Common patterns and examples
- Performance considerations
- Accessibility notes

## 🔒 Security Best Practices

1. **Never commit secrets**: Use environment variables
2. **Validate inputs**: Especially in calculators/forms
3. **Sanitize outputs**: Prevent XSS attacks
4. **HTTPS only**: Enforce secure connections
5. **CSP headers**: Configure Content Security Policy

## 🎯 Command Center Design Patterns

### Full-Screen Modal Architecture
```typescript
// Pattern: Separate trigger from content
<CommandCenterWrapper>        // Handles launch state
  <LaunchCard />             // Preview with features
  <FullScreenModal>          // Portal-rendered modal
    <CommandCenter />        // Full dashboard
  </FullScreenModal>
</CommandCenterWrapper>
```

### View-Based Navigation
```typescript
// Pattern: Dynamic view loading
const views = {
  dashboard: lazy(() => import('./views/DashboardView')),
  sites: lazy(() => import('./views/SitesView')),
  // ... other views
}

// Suspense boundary for each view
<Suspense fallback={<LoadingSkeleton />}>
  {views[activeView]}
</Suspense>
```

### Real-Time Data Simulation
```typescript
// Pattern: Stable mock data with controlled updates
const useRealtimeData = () => {
  // Stable base values
  const [data, setData] = useState(initialData)
  
  // Controlled updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        value: prev.value + (Math.random() - 0.5) * 0.1
      }))
    }, 5000) // Slow updates
  }, [])
}
```

## 🔄 State Management Patterns

### Local State First
- Use React state for component-specific data
- Context for cross-component communication
- No external state library needed (yet)

### Data Flow
```
User Interaction → Event Handler → State Update → Re-render
                         ↓
                   Side Effects (animations, API calls)
```

## 🎨 Animation Guidelines

### Performance Rules
1. **Transform & Opacity Only**: For 60fps
2. **will-change**: Use sparingly
3. **GPU Layers**: Check with DevTools
4. **Batch Updates**: requestAnimationFrame
5. **Debounce**: User interactions

### Animation Timing
```css
/* Standard timings */
--animation-fast: 200ms;
--animation-normal: 300ms;
--animation-slow: 500ms;
--animation-slower: 1000ms;

/* Easing */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

## 🔍 Debugging Tips

### Use MCP Servers for Debugging:
```typescript
// 1. Find error patterns
mcp__consult7__consultation({
  query: "Find all console errors and their causes",
  model: "gemini-2.5-flash|thinking"
})

// 2. Search for specific issues
mcp__serena__search_for_pattern({
  pattern: "TypeError|ReferenceError|undefined"
})

// 3. Analyze component tree
mcp__serena__get_symbols_overview({
  relative_path: "components/problematic"
})
```

### Common Issues & Solutions:
1. **Hydration Errors**: Check for client-only code
2. **Type Errors**: Run `npm run type-check`
3. **Build Failures**: Clear .next and node_modules
4. **Performance**: Use React DevTools Profiler

## 📚 Learning Resources

### MCP Server Documentation:
- [Serena](https://github.com/muntasirsyed/serena): Code search & editing
- [Consult7](https://github.com/auge/consult7): File analysis
- [Context7](https://github.com/context7): Library docs
- [Claude MCP](https://github.com/anthropics/claude-mcp): Code operations

### Key Technologies:
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Spring](https://react-spring.io/)

## ✅ Checklist for Every Task

Before starting:
- [ ] Read this CLAUDE.md file
- [ ] Use TodoWrite to plan tasks
- [ ] Activate MCP servers needed
- [ ] Consider Ultrathink mode

During development:
- [ ] Use multiple MCP servers
- [ ] Follow design patterns
- [ ] Test incrementally
- [ ] Check TypeScript errors

Before completing:
- [ ] Run build test
- [ ] Update documentation
- [ ] Clean up unused code
- [ ] Verify performance

## 🎯 Final Reminder

**ALWAYS USE MULTIPLE MCP SERVERS IN COMBINATION!**

The power of Claude Code comes from intelligently combining different MCP servers:
- Planning with sequential-thinking
- Analyzing with consult7
- Implementing with serena
- Reviewing with claude-mcp
- Testing with playwright

**ACTIVATE ULTRATHINK MODE FOR COMPLEX TASKS!**

Add `|thinking` to unlock deep reasoning capabilities.

---

---

## 🏆 ENTERPRISE ERP MODULES - COMPLETED

### 📊 **AnalyticsBI Module** - AI Business Intelligence
- **ExecutiveDashboard**: Real-time KPIs with NLP-generated insights
- **PredictiveAnalytics**: ML forecasting models with 87-95% accuracy
- **MarketIntelligence**: Competitor analysis & market opportunities
- **CustomReports**: Natural language query interface with AI responses

### 💰 **FinancialSuite Module** - AI Financial Intelligence
- **CashFlowPredictor**: ML-powered cash flow forecasting
- **LivePayments**: Real-time payment tracking with bKash/Nagad
- **AIInsights**: Automated financial analysis and recommendations
- **DashboardView**: Executive financial overview with alerts

### 🏢 **SalesCRM Module** - AI Sales Management
- **PipelineView**: Lead management with AI scoring algorithms
- **BuildingVisualization**: 3D property visualization with canvas
- **VirtualTours**: 360° property tours with interactive hotspots
- **AILeadIntelligence**: NLP-based lead analysis and conversion

### 📦 **Procurement Module** - AI Supply Chain
- **SupplierNetwork**: AI-powered supplier scoring and recommendations
- **PricePredictor**: ML-based material price forecasting
- **BlockchainTracking**: Immutable supply chain transparency
- **AIInsights**: Demand forecasting with smart contract automation

### 🔍 **QualityControl Module** - AI Quality Assurance
- **DefectDetection**: Computer vision with 98% accuracy rate
- **RealTimeMonitoring**: Live quality metrics and alerts
- **InspectionReports**: Automated photo analysis and reporting
- **PredictiveMaintenance**: Equipment failure prediction models

### 👥 **HRWorkforce Module** - AI Workforce Management
- **WorkforceAnalytics**: Real-time insights on 2,847 workers
- **BiometricAttendance**: Fingerprint & face recognition system
- **SkillsMatrix**: AI-powered competency tracking and training
- **PayrollOptimization**: Bangladesh-compliant automated payroll

### 🎯 **CommandCenter Module** - AI Command Hub (Original)
- **DashboardView**: Executive overview with real-time metrics
- **SitesView**: Multi-site management with live monitoring
- **ProjectsView**: Project lifecycle management and tracking
- **AnalyticsView**: Deep dive analytics and performance insights

---

Remember: You're not just coding, you're crafting an experience that will transform Bangladesh's construction industry! 🚀🇧🇩
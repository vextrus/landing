# 🎭 Orbital2D Animation Guide

## Animation Philosophy
Animations in the Orbital2D system are not mere decorations—they convey meaning, state, and relationships. Every motion follows natural physics to create an intuitive, premium experience.

## Core Animation Principles

### 1. **Physics-Based Motion**
All animations use spring physics or easing functions that mirror real-world motion:
```typescript
// Spring configuration for natural feel
const springConfig = {
  tension: 300,    // Higher = snappier
  friction: 20,    // Higher = less bouncy
  precision: 0.01  // Animation completion threshold
}
```

### 2. **Meaningful Transitions**
Every animation serves a purpose:
- **Scale changes** = Importance/focus shifts
- **Opacity fades** = State transitions
- **Position movements** = Relationship changes
- **Color shifts** = Status updates

### 3. **Performance First**
Animations must maintain 60fps:
- Use `transform` and `opacity` only
- Avoid animating `width`, `height`, or `position`
- Leverage GPU acceleration with `will-change`

## Animation Catalog

### Module Interactions

#### Hover State
```typescript
// React Spring implementation
const springProps = useSpring({
  scale: isHovered ? 1.12 : 1,
  rotateX: isHovered ? mousePos.y * 0.15 : 0,
  rotateY: isHovered ? -mousePos.x * 0.15 : 0,
  config: { tension: 300, friction: 20 }
})
```

**Timing**: 200-300ms spring response
**Effect**: 3D tilt following mouse position

#### Click Animation
```typescript
// Framer Motion implementation
whileTap={{ scale: 0.95 }}
transition={{ type: "spring", stiffness: 400 }}
```

**Timing**: 100ms compression, 200ms release
**Effect**: Physical button press feedback

### Connection Animations

#### Energy Flow Particles
```typescript
// Continuous particle animation
animate={{
  cx: [from.x, to.x, from.x],
  cy: [from.y, to.y, from.y],
  opacity: [0, 1, 1, 0]
}}
transition={{
  duration: 6,
  repeat: Infinity,
  ease: "linear"
}}
```

**Timing**: 6-second full cycle
**Pattern**: 3 particles forward, 3 reverse, offset by 2s each

#### Beam Activation
```typescript
// Connection beam pulse
animate={{
  strokeWidth: isActive ? [4, 6, 4] : 4,
  opacity: isActive ? [0.6, 1, 0.6] : 0.4
}}
transition={{
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut"
}}
```

**Timing**: 3-second pulse cycle
**Effect**: Breathing effect indicating active data flow

### Central Hub Animations

#### Orbital Rings
```typescript
// Counter-rotating rings
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
/>
<motion.div
  animate={{ rotate: -360 }}
  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
/>
```

**Timing**: 10s and 15s for visual variety
**Effect**: Creates dynamic, ever-changing patterns

#### Pulse Rings
```typescript
// Expanding pulse effect
animate={{
  scale: [1, 1.5, 1.5],
  opacity: [0.5, 0, 0]
}}
transition={{ 
  duration: 2, 
  repeat: Infinity,
  delay: index * 0.5  // Staggered pulses
}}
```

**Timing**: 2s per pulse, 0.5s stagger
**Effect**: Radar-like scanning visualization

### Background Effects

#### Aurora Neural Grid
```typescript
// Multi-layer parallax aurora
const layers = [
  { duration: 20, amplitude: 100, opacity: 0.3 },
  { duration: 25, amplitude: 150, opacity: 0.2 },
  { duration: 30, amplitude: 200, opacity: 0.1 }
]
```

**Timing**: 20-30s slow drift
**Effect**: Subtle depth and atmosphere

### State Transitions

#### Module Entry/Exit
```typescript
// Staggered module appearance
initial={{ scale: 0, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ 
  delay: index * 0.1,
  type: "spring",
  stiffness: 200
}}
```

**Timing**: 100ms stagger between modules
**Effect**: Organic growth from center

#### View Switching
```typescript
// Page transition
exit={{ opacity: 0, x: -100 }}
enter={{ opacity: 1, x: 0 }}
transition={{ 
  duration: 0.5, 
  type: "spring", 
  stiffness: 100 
}}
```

**Timing**: 500ms total transition
**Effect**: Smooth lateral slide with fade

## Animation Timing Reference

### Micro-animations (< 300ms)
- Hover responses: 200ms
- Click feedback: 100ms
- Tooltip appearance: 200ms
- Focus indicators: 150ms

### Short Animations (300ms - 1s)
- State transitions: 500ms
- Module scaling: 400ms
- Connection activation: 600ms
- Card flips: 800ms

### Medium Animations (1s - 3s)
- Pulse effects: 2s
- Beam breathing: 3s
- Module entry sequence: 1.6s (total)
- Data loading: 1.5s

### Long Animations (3s+)
- Particle cycles: 6s
- Orbital rotations: 10-15s
- Aurora drift: 20-30s
- Ambient effects: 15-25s

## Performance Guidelines

### Optimization Techniques
1. **Use CSS transforms**
   ```css
   transform: translateX() translateY() scale() rotate();
   ```

2. **Batch DOM updates**
   ```typescript
   // Bad: Multiple state updates
   setX(newX); setY(newY); setScale(newScale);
   
   // Good: Single state update
   setTransform({ x: newX, y: newY, scale: newScale });
   ```

3. **Debounce interactions**
   ```typescript
   const debouncedHover = useMemo(
     () => debounce(handleHover, 50),
     []
   );
   ```

### Mobile Considerations
- Reduce particle count by 50%
- Simplify hover states (no 3D tilt)
- Increase animation durations by 20%
- Disable non-essential ambient effects

### Accessibility
```typescript
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const animationConfig = prefersReducedMotion 
  ? { duration: 0 } 
  : { duration: 0.5, type: "spring" };
```

## Common Patterns

### Attention Grabbers
```typescript
// Subtle shake
animate={{ x: [0, -2, 2, -2, 2, 0] }}
transition={{ duration: 0.5 }}

// Glow pulse
animate={{ 
  boxShadow: [
    '0 0 0 0 rgba(168, 85, 247, 0.4)',
    '0 0 0 10px rgba(168, 85, 247, 0)',
  ]
}}
```

### Loading States
```typescript
// Orbital loading spinner
<motion.div
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 1, 
    repeat: Infinity, 
    ease: "linear" 
  }}
/>
```

### Success/Error Feedback
```typescript
// Success checkmark
animate={{ 
  pathLength: [0, 1],
  opacity: [0, 1]
}}
transition={{ duration: 0.5, ease: "easeOut" }}

// Error shake
animate={{ x: [-10, 10, -10, 10, 0] }}
transition={{ duration: 0.4 }}
```

## Testing Animations

### Performance Testing
1. Use Chrome DevTools Performance tab
2. Target 60fps consistently
3. Check for layout thrashing
4. Monitor GPU memory usage

### Visual Testing
1. Test at different speeds (0.5x, 2x)
2. Verify start/end states
3. Check interruption behavior
4. Validate responsive scaling

### User Testing
1. A/B test animation durations
2. Gather feedback on motion comfort
3. Verify animations enhance usability
4. Ensure cultural appropriateness

---

Remember: Every animation should enhance the user experience, not distract from it. When in doubt, make it subtler and faster.
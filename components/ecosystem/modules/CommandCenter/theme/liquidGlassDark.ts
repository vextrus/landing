// Liquid Glass Dark Theme for Command Center
// This theme combines deep space aesthetics with glass morphism optimized for dark backgrounds

export const liquidGlassDarkTheme = {
  // Color Palette - Deep Space Inspiration
  colors: {
    // Primary background colors
    background: {
      primary: '#0A0B1E',      // Deep space blue-black
      secondary: '#0F1629',    // Nebula dark blue
      tertiary: '#141B3A',     // Cosmic indigo
      overlay: 'rgba(10, 11, 30, 0.95)',
      blur: 'rgba(10, 11, 30, 0.85)',
    },
    
    // Glass effects for dark theme
    glass: {
      // Light intensity levels with WCAG AA+ compliance
      light: {
        background: 'rgba(255, 255, 255, 0.03)',
        border: 'rgba(255, 255, 255, 0.08)',
        shadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
        blur: '16px',
      },
      medium: {
        background: 'rgba(255, 255, 255, 0.06)',
        border: 'rgba(255, 255, 255, 0.12)',
        shadow: '0 12px 48px rgba(31, 38, 135, 0.25)',
        blur: '20px',
      },
      strong: {
        background: 'rgba(255, 255, 255, 0.09)',
        border: 'rgba(255, 255, 255, 0.16)',
        shadow: '0 16px 64px rgba(31, 38, 135, 0.35)',
        blur: '24px',
      },
      ultra: {
        background: 'rgba(255, 255, 255, 0.12)',
        border: 'rgba(255, 255, 255, 0.20)',
        shadow: '0 20px 80px rgba(31, 38, 135, 0.45)',
        blur: '32px',
      },
    },
    
    // Accent colors - Cosmic palette
    accent: {
      primary: '#00D9FF',      // Cyan aurora
      secondary: '#FF00EA',    // Magenta nebula
      tertiary: '#00FF88',     // Green pulsar
      quaternary: '#FFB800',   // Gold solar
      danger: '#FF3366',       // Red alert
      success: '#00FF88',      // Green success
      warning: '#FFB800',      // Amber warning
      info: '#00D9FF',         // Blue info
    },
    
    // Text colors with high contrast
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.75)',
      tertiary: 'rgba(255, 255, 255, 0.55)',
      quaternary: 'rgba(255, 255, 255, 0.35)',
      inverse: '#0A0B1E',
    },
    
    // Special effects
    aurora: {
      cyan: 'rgba(0, 217, 255, 0.15)',
      magenta: 'rgba(255, 0, 234, 0.15)',
      purple: 'rgba(147, 51, 234, 0.15)',
      blue: 'rgba(59, 130, 246, 0.15)',
    },
  },
  
  // Gradient definitions
  gradients: {
    // Background gradients
    cosmic: 'linear-gradient(135deg, #0A0B1E 0%, #0F1629 50%, #141B3A 100%)',
    nebula: 'radial-gradient(ellipse at top, #1A1F3A 0%, #0A0B1E 100%)',
    aurora: 'linear-gradient(180deg, rgba(0, 217, 255, 0.1) 0%, transparent 50%, rgba(255, 0, 234, 0.1) 100%)',
    
    // Glass overlay gradients
    glassOverlay: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    shimmer: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
    
    // Accent gradients
    cyanGlow: 'linear-gradient(135deg, #00D9FF 0%, #0099CC 100%)',
    magentaGlow: 'linear-gradient(135deg, #FF00EA 0%, #CC00BB 100%)',
    auroraGlow: 'linear-gradient(90deg, #00D9FF 0%, #FF00EA 50%, #00FF88 100%)',
    
    // Button gradients
    buttonPrimary: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2) 0%, rgba(0, 217, 255, 0.1) 100%)',
    buttonHover: 'linear-gradient(135deg, rgba(0, 217, 255, 0.3) 0%, rgba(0, 217, 255, 0.15) 100%)',
  },
  
  // Animation configurations
  animations: {
    // Ambient animations
    auroraFlow: {
      duration: '20s',
      keyframes: `
        @keyframes auroraFlow {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          33% { transform: translateY(-20%) rotate(120deg); opacity: 0.5; }
          66% { transform: translateY(20%) rotate(240deg); opacity: 0.3; }
          100% { transform: translateY(0) rotate(360deg); opacity: 0.3; }
        }
      `,
    },
    
    // Specular highlight
    specularHighlight: {
      duration: '3s',
      keyframes: `
        @keyframes specularHighlight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `,
    },
    
    // Glass shimmer
    glassShimmer: {
      duration: '4s',
      keyframes: `
        @keyframes glassShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `,
    },
    
    // Pulse glow
    pulseGlow: {
      duration: '2s',
      keyframes: `
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 217, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(0, 217, 255, 0.8); }
        }
      `,
    },
  },
  
  // Component styles
  components: {
    // Card styles
    card: {
      base: `
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 12px 48px rgba(31, 38, 135, 0.25);
        position: relative;
        overflow: hidden;
      `,
      hover: `
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.16);
        box-shadow: 0 16px 64px rgba(31, 38, 135, 0.35);
        transform: translateY(-2px);
      `,
    },
    
    // Button styles
    button: {
      primary: `
        background: linear-gradient(135deg, rgba(0, 217, 255, 0.2) 0%, rgba(0, 217, 255, 0.1) 100%);
        border: 1px solid rgba(0, 217, 255, 0.3);
        color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      `,
      hover: `
        background: linear-gradient(135deg, rgba(0, 217, 255, 0.3) 0%, rgba(0, 217, 255, 0.15) 100%);
        border-color: rgba(0, 217, 255, 0.5);
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
      `,
    },
    
    // Input styles
    input: {
      base: `
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
      `,
      focus: `
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(0, 217, 255, 0.5);
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.2);
      `,
    },
  },
  
  // Special effects
  effects: {
    // Aurora background layers
    auroraLayers: [
      {
        gradient: 'radial-gradient(ellipse at 20% 30%, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
        animation: 'auroraFlow 20s ease-in-out infinite',
      },
      {
        gradient: 'radial-gradient(ellipse at 80% 70%, rgba(255, 0, 234, 0.15) 0%, transparent 70%)',
        animation: 'auroraFlow 25s ease-in-out infinite reverse',
      },
      {
        gradient: 'radial-gradient(ellipse at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
        animation: 'auroraFlow 30s ease-in-out infinite',
      },
    ],
    
    // Particle system
    particles: {
      count: 50,
      color: 'rgba(0, 217, 255, 0.5)',
      size: { min: 1, max: 3 },
      speed: { min: 0.5, max: 2 },
      opacity: { min: 0.2, max: 0.8 },
    },
    
    // Neural network lines
    neuralNetwork: {
      color: 'rgba(0, 217, 255, 0.2)',
      width: 1,
      pulseColor: 'rgba(0, 217, 255, 0.8)',
      pulseSpeed: 2,
    },
  },
  
  // Utility classes
  utilities: {
    glassPanel: 'glass-panel-dark',
    glowText: 'text-glow-cyan',
    shimmerEffect: 'shimmer-effect',
    auroraBackground: 'aurora-bg',
    neuralGrid: 'neural-grid',
  },
}

// CSS utility classes generator
export const generateLiquidGlassCSS = () => {
  const theme = liquidGlassDarkTheme
  
  return `
    /* Liquid Glass Dark Theme Utilities */
    
    /* Glass Panel */
    .glass-panel-dark {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: ${theme.colors.glass.medium.background};
      border: 1px solid ${theme.colors.glass.medium.border};
      box-shadow: ${theme.colors.glass.medium.shadow};
      position: relative;
      overflow: hidden;
    }
    
    .glass-panel-dark::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${theme.gradients.glassOverlay};
      pointer-events: none;
    }
    
    /* Glow Text */
    .text-glow-cyan {
      color: ${theme.colors.accent.primary};
      text-shadow: 0 0 10px rgba(0, 217, 255, 0.5),
                   0 0 20px rgba(0, 217, 255, 0.3),
                   0 0 30px rgba(0, 217, 255, 0.2);
    }
    
    /* Shimmer Effect */
    .shimmer-effect {
      position: relative;
      overflow: hidden;
    }
    
    .shimmer-effect::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: ${theme.gradients.shimmer};
      animation: ${theme.animations.specularHighlight.duration} ease-in-out infinite;
      transform: rotate(30deg);
      pointer-events: none;
    }
    
    /* Aurora Background */
    .aurora-bg {
      position: relative;
      background: ${theme.colors.background.primary};
    }
    
    .aurora-bg::before,
    .aurora-bg::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .aurora-bg::before {
      background: ${theme.effects.auroraLayers[0].gradient};
      animation: ${theme.effects.auroraLayers[0].animation};
    }
    
    .aurora-bg::after {
      background: ${theme.effects.auroraLayers[1].gradient};
      animation: ${theme.effects.auroraLayers[1].animation};
    }
    
    /* Neural Grid */
    .neural-grid {
      background-image: 
        linear-gradient(${theme.effects.neuralNetwork.color} 1px, transparent 1px),
        linear-gradient(90deg, ${theme.effects.neuralNetwork.color} 1px, transparent 1px);
      background-size: 50px 50px;
      animation: neuralPulse 4s ease-in-out infinite;
    }
    
    @keyframes neuralPulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }
    
    /* Animations */
    ${theme.animations.auroraFlow.keyframes}
    ${theme.animations.specularHighlight.keyframes}
    ${theme.animations.glassShimmer.keyframes}
    ${theme.animations.pulseGlow.keyframes}
  `
}

// Theme hook for components
export const useLiquidGlassDark = () => liquidGlassDarkTheme
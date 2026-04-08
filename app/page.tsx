import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { TheRealitySection } from '@/components/sections/the-reality'
import { TheSystemSection } from '@/components/sections/the-system'
import { AiEngineSection } from '@/components/sections/ai-engine'
import { TheNumbersSection } from '@/components/sections/the-numbers'
import { ArchitectureSection } from '@/components/sections/architecture'
import { BangladeshSection } from '@/components/sections/bangladesh'
import { VisionCtaSection } from '@/components/sections/vision-cta'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TheRealitySection />
        <TheSystemSection />
        <AiEngineSection />
        <TheNumbersSection />
        <ArchitectureSection />
        <BangladeshSection />
        <VisionCtaSection />
      </main>
      <Footer />
    </>
  )
}

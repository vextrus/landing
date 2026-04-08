import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Overline } from '@/components/ui/overline'
import { RealityScrollytelling } from '@/components/interactive/reality-scrollytelling'

export function TheRealitySection() {
  return (
    <Section variant="dark" id="reality">
      <Container>
        <Overline>The Reality</Overline>
        <h2 className="mt-4 max-w-3xl font-heading text-section font-bold text-[var(--text-primary)]">
          The world moved. Most of construction hasn&apos;t.
        </h2>
      </Container>
      <RealityScrollytelling />
    </Section>
  )
}

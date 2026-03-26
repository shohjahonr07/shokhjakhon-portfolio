import { Reveal } from "@/components/cinematic/reveal";
import { ObsidianBackground } from "@/components/cinematic/ObsidianBackground";
import { TopNav } from "@/components/portfolio/TopNav";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AcademicSection } from "@/components/portfolio/AcademicSection";
import { ProjectsCardsSection } from "@/components/portfolio/ProjectsCardsSection";
import { ContactSection } from "@/components/portfolio/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ObsidianBackground />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 z-[100]"
      >
        Skip to content
      </a>

      <TopNav />

      <main className="flex flex-col">
        <Reveal delayMs={0}>
          <HeroSection />
        </Reveal>
        <Reveal delayMs={120}>
          <AcademicSection />
        </Reveal>
        <Reveal delayMs={240}>
          <ProjectsCardsSection />
        </Reveal>
        <Reveal delayMs={360}>
          <ContactSection />
        </Reveal>

        <footer className="py-14 text-center text-xs text-foreground/55">
          Built with Next.js App Router, Tailwind CSS, and Supabase real-time.
        </footer>
      </main>
    </div>
  );
}

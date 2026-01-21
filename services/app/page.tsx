// Home Page - KynguyenAI v3.0
// ISR: Revalidate every 5 minutes
// Rule 1.5 - Strategic Suspense Boundaries
export const revalidate = 300;

import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FeaturedToolsSection } from "@/components/home/FeaturedToolsSection";
import { HeroSkeleton, FeaturedToolsSkeleton } from "@/components/home/Skeletons";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content - Rule 1.5: Suspense boundaries for faster initial paint */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Suspense */}
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>

        {/* Newsletter Section - Static, no Suspense needed */}
        <NewsletterSection />

        {/* Featured Tools with Suspense */}
        <Suspense fallback={<FeaturedToolsSkeleton />}>
          <FeaturedToolsSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

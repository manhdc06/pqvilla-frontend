'use client';

import { useState } from 'react';

import { ContactModal } from '~/components/pqvilla/contact-modal';
import { CtaSection } from '~/components/pqvilla/cta-section';
import { HeroSection } from '~/components/pqvilla/hero-section';
import { ProcessSection } from '~/components/pqvilla/process-section';
import { ProductsSection } from '~/components/pqvilla/products-section';
import { ProjectsSection } from '~/components/pqvilla/projects-section';
import { StatsSection } from '~/components/pqvilla/stats-section';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main style={{ background: 'var(--pq-bg-primary)' }}>
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      <ProductsSection />
      <ProjectsSection />
      <StatsSection />
      <ProcessSection />
      <CtaSection onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}

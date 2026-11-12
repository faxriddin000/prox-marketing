import React from 'react';
import { HeroSection } from './HeroSection';
import { ServicesPreview } from './ServicesPreview';
import { UspSection } from './UspSection';
import { PricingPreview } from './PricingPreview';
import { CtaSection } from './CtaSection';

export const HomePage = ({ onViewChange, onOpenConsultation, onSelectCategory }) => {
  return (
    <div className="space-y-0">
      <HeroSection
        onOpenConsultation={() => onOpenConsultation('Marketing')}
        onViewChange={onViewChange}
        onSelectCategory={onSelectCategory}
      />
      <ServicesPreview
        onViewChange={onViewChange}
        onSelectCategory={onSelectCategory}
      />
      <UspSection />
      <PricingPreview
        onViewChange={onViewChange}
        onOpenConsultation={onOpenConsultation}
      />
      <CtaSection />
    </div>
  );
};

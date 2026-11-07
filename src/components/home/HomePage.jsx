import React from 'react';
import { HeroSection } from './HeroSection';
import { ServicesPreview } from './ServicesPreview';
import { UspSection } from './UspSection';
import { PartnersSlider } from './PartnersSlider';
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
      <PartnersSlider onViewChange={onViewChange} />
      <PricingPreview
        onViewChange={onViewChange}
        onOpenConsultation={onOpenConsultation}
      />
      <CtaSection />
    </div>
  );
};

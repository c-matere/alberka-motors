import React from 'react';
import PerspectiveTunnelHero from './ui/perspective-tunnel-hero';
import { CmsPage } from '../services/cmsContent';

export interface HeroProps {
  onExploreFleet: () => void;
  onExploreWorkshop: () => void;
  pageData?: CmsPage;
}

export const Hero: React.FC<HeroProps> = ({ onExploreFleet, onExploreWorkshop }) => {
  return (
    <section className="relative w-full overflow-hidden bg-white text-zinc-900">
      <PerspectiveTunnelHero
        onExploreFleet={onExploreFleet}
        onExploreWorkshop={onExploreWorkshop}
      />
    </section>
  );
};

export default Hero;

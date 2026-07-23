import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { BoxBuilder } from '@/components/box-builder';

export const metadata: Metadata = {
  title: 'Build a Box',
  description: 'Mix any six bags of jackfruit chips and save 15%.',
};

export default function BuildABoxPage() {
  return (
    <>
      <PageHero
        eyebrow="Mix it up"
        title="Build your own box"
        intro="Can’t pick a flavour? Don’t. Choose any six bags, we’ll pack them together, and you save 15% on the lot."
      />
      <div className="container-page py-12 md:py-16">
        <BoxBuilder />
      </div>
    </>
  );
}

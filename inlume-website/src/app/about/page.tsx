import type { Metadata } from 'next';
import AboutClient from '@/components/sections/AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Inlume Innovations – our mission to deliver premium, energy-efficient LED lighting solutions for residential, commercial and industrial spaces.',
};

export default function AboutPage() {
  return <AboutClient />;
}

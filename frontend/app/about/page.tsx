import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | TopStake',
  description: 'Learn more about TopStake, our mission, values, and the team building the future of digital experiences.',
};

export default function AboutPage() {
  return <AboutClient />;
}

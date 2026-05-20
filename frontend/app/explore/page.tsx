import type { Metadata } from 'next';
import ExploreClient from './ExploreClient';

export const metadata: Metadata = {
  title: 'Exploring Ideas | TopStake',
  description: 'Explore new concepts, architectural paradigms, and design ideas for your next digital product.',
};

export default function ExplorePage() {
  return <ExploreClient />;
}

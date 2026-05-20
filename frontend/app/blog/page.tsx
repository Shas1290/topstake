import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog | TopStake',
  description: 'Read our latest articles on web development, design, and technology.',
};

export default function BlogPage() {
  return <BlogClient />;
}

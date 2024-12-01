import type { Page } from '../types/page';

export const samplePages: Page[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with AI Models',
    content: '# Getting Started\n\nLearn how to use our AI models effectively...',
    lastUpdated: '2024-03-15T10:30:00Z',
    publishDate: '2024-03-01T00:00:00Z',
    author: {
      name: 'Sarah Wilson',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      profileUrl: 'https://github.com/sarahwilson'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop'
  },
  {
    id: 'best-practices',
    title: 'AI Model Best Practices',
    content: '# Best Practices\n\nFollow these guidelines for optimal results...',
    lastUpdated: '2024-03-14T15:45:00Z',
    publishDate: '2024-03-10T00:00:00Z',
    author: {
      name: 'Michael Chen',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      profileUrl: 'https://github.com/michaelchen'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=600&fit=crop'
  }
];
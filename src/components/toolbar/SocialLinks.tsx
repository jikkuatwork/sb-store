import React from 'react';
import { Github, Twitter } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com',
    label: 'GitHub',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com',
    label: 'Twitter',
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label={label}
        >
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
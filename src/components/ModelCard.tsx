import React from 'react';
import { ExternalLink, Github, Zap, Star } from 'lucide-react';
import { clsx } from 'clsx';
import type { Model } from '../types';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <div
      className={clsx(
        'group relative flex gap-3 rounded-lg border p-2 transition-all hover:shadow-sm',
        model.metadata?.highlighted
          ? 'border-indigo-100 bg-gradient-to-r from-indigo-50/30 to-transparent'
          : 'border-gray-100 bg-white'
      )}
    >
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={model.thumbnailUrl}
          alt={model.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-1 overflow-hidden py-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {model.name}
              </h3>
              <div className="flex flex-shrink-0 items-center gap-1">
                {model.computeRequirements && (
                  <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-600">
                    <Zap size={10} className="flex-shrink-0" />
                    {model.computeRequirements.machineType}
                  </span>
                )}
                {model.metadata?.highlighted && (
                  <span className="group/featured relative flex items-center rounded-full bg-indigo-100 p-1 text-indigo-600">
                    <Star className="h-3 w-3" fill="currentColor" />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/featured:block">
                      <span className="relative bg-gray-900/90 backdrop-blur-sm text-white text-[11px] rounded-lg py-1.5 px-2 whitespace-nowrap">
                        Featured
                        <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900/90 backdrop-blur-sm"></span>
                      </span>
                    </span>
                  </span>
                )}
              </div>
            </div>

            <p className="mt-0.5 truncate text-xs text-gray-500">
              {model.description}
            </p>

            {model.version && (
              <p className="mt-0.5 truncate text-[10px] text-gray-400">
                Version {model.version}
              </p>
            )}
          </div>

          <div className="flex flex-shrink-0 gap-1">
            <a
              href={`https://github.com/fal-ai/${model.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <Github size={14} />
            </a>

            <a
              href={model.modelUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

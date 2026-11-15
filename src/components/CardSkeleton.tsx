import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="apple-card p-6 sm:p-8 flex flex-col justify-between bg-white border border-zinc-200 animate-pulse">
      <div>
        {/* Media Frame Placeholder with Shimmer */}
        <div className="w-full h-[260px] sm:h-[300px] md:h-[320px] rounded-[24px] overflow-hidden bg-zinc-100 border border-zinc-200 mb-6 relative">
          <div className="skeleton-shimmer" />
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-12 h-6 rounded-full bg-zinc-200" />
            <div className="w-16 h-6 rounded-full bg-zinc-200" />
          </div>
        </div>

        {/* Identity & Heritage Meta Line */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-28 h-3.5 rounded-full bg-zinc-200" />
          <div className="w-16 h-4 rounded bg-zinc-200" />
        </div>

        {/* Moniker & Title */}
        <div className="w-32 h-3 rounded-full bg-zinc-200 mb-2" />
        <div className="w-3/4 h-6 rounded-md bg-zinc-200 mb-3" />
        <div className="w-full h-4 rounded bg-zinc-100 mb-6" />

        {/* Key Spec Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-zinc-200">
          <div className="h-8 rounded bg-zinc-100" />
          <div className="h-8 rounded bg-zinc-100" />
          <div className="h-8 rounded bg-zinc-100" />
        </div>
      </div>

      {/* Footer / Price & Button */}
      <div className="pt-6 border-t border-zinc-200 flex items-center justify-between">
        <div className="w-24 h-6 rounded bg-zinc-200" />
        <div className="w-24 h-8 rounded-full bg-zinc-200" />
      </div>
    </div>
  );
};

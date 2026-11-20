import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[12px] border border-[#ebebeb] p-3 flex flex-col justify-between animate-pulse text-left">
      <div>
        {/* Media Frame Placeholder */}
        <div className="w-full aspect-[4/3] rounded-[10px] bg-[#f7f7f7] border border-[#ebebeb] mb-2.5 relative">
          <div className="absolute top-2 left-2 flex gap-1.5">
            <div className="w-16 h-5 rounded-full bg-[#ebebeb]" />
          </div>
        </div>

        {/* Identity & Heritage Meta Line */}
        <div className="space-y-1.5 px-0.5">
          <div className="w-3/4 h-4 rounded bg-[#f7f7f7]" />
          <div className="w-1/2 h-3.5 rounded bg-[#f7f7f7]" />
        </div>
      </div>

      {/* Footer / Price & Action */}
      <div className="mt-3 pt-2 border-t border-[#ebebeb] flex items-center justify-between px-0.5">
        <div className="w-24 h-4 rounded bg-[#f7f7f7]" />
        <div className="w-14 h-4 rounded bg-[#f7f7f7]" />
      </div>
    </div>
  );
};

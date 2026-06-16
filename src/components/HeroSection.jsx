import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-[#F0F5FA] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#0F172A] mb-6 leading-[1.2] tracking-tight max-w-4xl mx-auto">
            Know that your donation <br className="hidden sm:block" />
            is making a difference
          </h1>
          <p className="text-base sm:text-lg text-[#475569] mb-10 max-w-2xl mx-auto leading-relaxed">
            StellarAid uses blockchain transparency to prove every single project you fund, 
            complete with verification and real-time impact tracking.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-row gap-4 justify-center items-center">
            <button className="bg-[#003087] hover:bg-[#002266] text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Donate Now
            </button>
            <button className="bg-[#F8FAFC]/80 hover:bg-[#F1F5F9] text-[#0F172A] font-semibold py-3 px-8 rounded-lg border border-[#D0DDEB] shadow-sm hover:shadow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Learn More
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="w-full max-w-3xl bg-white border border-[#E2EAF2] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)]">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#003087] tracking-tight mb-1">
                $2.4M
              </div>
              <div className="text-slate-500 text-xs sm:text-sm font-medium">
                Donated
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#F57C00] tracking-tight mb-1">
                12.5K
              </div>
              <div className="text-slate-500 text-xs sm:text-sm font-medium">
                Projects
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00875A] tracking-tight mb-1">
                89K
              </div>
              <div className="text-slate-500 text-xs sm:text-sm font-medium">
                Donors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


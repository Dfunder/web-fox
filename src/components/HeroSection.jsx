import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Know that your donation is <br className="hidden sm:block" />
            making a difference
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            StellarAid uses blockchain transparency to prove every single project you fund, 
            complete with verification and real-time impact tracking.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              Donate Now
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
              $2.4M
            </div>
            <div className="text-gray-600 text-lg font-medium">
              Donated
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2">
              12.5K
            </div>
            <div className="text-gray-600 text-lg font-medium">
              Projects
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
              89K
            </div>
            <div className="text-gray-600 text-lg font-medium">
              Donors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

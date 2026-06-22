import { Shield, TrendingUp, Heart, Zap } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  // Icon mapping
  const iconMap = {
    'shield': Shield,
    'trending-up': TrendingUp,
    'heart': Heart,
    'lightning': Zap
  };

  // Get the icon component with fallback to Shield
  const IconComponent = iconMap[icon] || Shield;

  // Log warning if invalid icon type
  if (!iconMap[icon]) {
    console.warn(`FeatureCard: Invalid icon type "${icon}". Using fallback Shield icon.`);
  }

  return (
    <div 
      className="bg-white border border-[#E2EAF2] rounded-2xl p-8 shadow-sm transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.06)] hover:border-[#003087]/25 h-full"
      data-testid="feature-card"
    >
      <div className="mb-8">
        <IconComponent className="w-10 h-10 text-[#003087]" strokeWidth={2} />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-4 leading-tight">{title}</h3>
      <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
  );
};

export default FeatureCard;



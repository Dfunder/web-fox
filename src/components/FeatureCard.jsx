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
      className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transition-all duration-300 ease-in-out cursor-pointer h-full"
      data-testid="feature-card"
    >
      <div className="mb-8">
        <IconComponent className="w-10 h-10 text-[#0F172A]" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-navy mb-4 leading-tight">{title}</h3>
      <p className="text-base text-gray-500 leading-relaxed font-medium">{description}</p>
    </div>
  );
};

export default FeatureCard;


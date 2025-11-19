import { TierType, TIER_RATES } from "@/utils/distance";
import { Card } from "@/components/ui/card";
import { Plane, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TierSelectorProps {
  selectedTier: TierType | null;
  onTierSelect: (tier: TierType) => void;
}

const tiers = [
  {
    id: "standard" as TierType,
    name: "Standard",
    icon: Plane,
    rate: TIER_RATES.standard,
    features: ["2 Passengers", "Standard Speed", "City Routes"],
  },
  {
    id: "premium" as TierType,
    name: "Premium",
    icon: Crown,
    rate: TIER_RATES.premium,
    features: ["4 Passengers", "High Speed", "Priority Routes"],
  },
];

export const TierSelector = ({ selectedTier, onTierSelect }: TierSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Select Tier</h3>
      <div className="grid grid-cols-2 gap-3">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.id;
          
          return (
            <Card
              key={tier.id}
              className={cn(
                "p-4 cursor-pointer transition-all hover:shadow-md border-2",
                isSelected
                  ? "border-primary bg-primary/5 shadow-elevated"
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => onTierSelect(tier.id)}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-5 w-5", isSelected ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("font-semibold", isSelected ? "text-primary" : "text-foreground")}>
                    {tier.name}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ₹{tier.rate}
                  <span className="text-sm text-muted-foreground font-normal">/km</span>
                </div>
                <ul className="space-y-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

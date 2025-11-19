import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Route, IndianRupee } from "lucide-react";

interface FareSummaryProps {
  distance: number | null;
  fare: number | null;
  tier: string | null;
}

export const FareSummary = ({ distance, fare, tier }: FareSummaryProps) => {
  if (!distance || !fare || !tier) {
    return (
      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground text-center">
          Select pickup and drop-off locations to see fare estimate
        </p>
      </Card>
    );
  }

  const estimatedTime = Math.ceil(distance * 2.5); // Approximate 2.5 minutes per km

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Route className="h-4 w-4 text-primary" />
          Trip Summary
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Distance</span>
            <span className="font-medium text-foreground">{distance} km</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tier</span>
            <span className="font-medium text-foreground capitalize">{tier}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Est. Time</span>
            <span className="font-medium text-foreground">{estimatedTime} mins</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">Total Fare</span>
          <div className="flex items-center gap-1 text-2xl font-bold text-primary">
            <IndianRupee className="h-5 w-5" />
            {fare.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </Card>
  );
};

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BookingConfirmationProps {
  open: boolean;
  onClose: () => void;
  bookingDetails: {
    bookingId: string;
    pickup: string;
    dropoff: string;
    distance: number;
    fare: number;
    tier: string;
    eta: number;
  };
}

export const BookingConfirmation = ({ open, onClose, bookingDetails }: BookingConfirmationProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <DialogTitle className="text-2xl text-center">SkyCab Confirmed!</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Estimated Arrival</span>
            </div>
            <p className="text-3xl font-bold text-primary">{bookingDetails.eta} minutes</p>
            <p className="text-xs text-muted-foreground">Booking ID: {bookingDetails.bookingId}</p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary mt-1" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Pickup</p>
                <p className="text-sm font-medium">{bookingDetails.pickup}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-destructive mt-1" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Drop-off</p>
                <p className="text-sm font-medium">{bookingDetails.dropoff}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-medium">{bookingDetails.distance} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tier</span>
              <span className="font-medium capitalize">{bookingDetails.tier}</span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span>Total Fare</span>
              <span className="text-primary">₹{bookingDetails.fare.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

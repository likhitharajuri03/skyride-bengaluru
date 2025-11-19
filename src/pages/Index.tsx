import { useState } from "react";
import { MapView } from "@/components/MapView";
import { LocationInput } from "@/components/LocationInput";
import { TierSelector } from "@/components/TierSelector";
import { FareSummary } from "@/components/FareSummary";
import { BookingConfirmation } from "@/components/BookingConfirmation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane } from "lucide-react";
import { calculateDistance, calculateFare, TierType } from "@/utils/distance";
import { toast } from "sonner";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

type SelectionMode = "pickup" | "dropoff" | null;

const Index = () => {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierType | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const distance = pickup && dropoff ? calculateDistance(pickup, dropoff) : null;
  const fare = distance && selectedTier ? calculateFare(distance, selectedTier) : null;

  const handleMapClick = (lat: number, lng: number) => {
    if (!selectionMode) {
      toast.info("Please select whether to set pickup or drop-off location first");
      return;
    }

    // Reverse geocode to get address
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then((res) => res.json())
      .then((data) => {
        const location = {
          lat,
          lng,
          address: data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        };

        if (selectionMode === "pickup") {
          setPickup(location);
          toast.success("Pickup location set");
          setSelectionMode("dropoff");
        } else {
          setDropoff(location);
          toast.success("Drop-off location set");
          setSelectionMode(null);
        }
      })
      .catch(() => {
        const location = {
          lat,
          lng,
          address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        };

        if (selectionMode === "pickup") {
          setPickup(location);
          toast.success("Pickup location set");
          setSelectionMode("dropoff");
        } else {
          setDropoff(location);
          toast.success("Drop-off location set");
          setSelectionMode(null);
        }
      });
  };

  const handleBooking = async () => {
    if (!pickup || !dropoff || !selectedTier || !distance || !fare) return;

    setIsBooking(true);
    
    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const bookingId = `SKY${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const eta = Math.ceil(distance * 2.5);

    setBookingDetails({
      bookingId,
      pickup: pickup.address,
      dropoff: dropoff.address,
      distance,
      fare,
      tier: selectedTier,
      eta,
    });

    setIsBooking(false);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Reset the form
    setPickup(null);
    setDropoff(null);
    setSelectedTier(null);
    setSelectionMode(null);
  };

  const isBookingEnabled = pickup && dropoff && selectedTier;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Bengaluru SkyCab</h1>
              <p className="text-xs text-muted-foreground">Future of Urban Transport</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 h-[calc(100vh-120px)]">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto">
            <Card className="p-4 space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-4 text-foreground">Book Your Flight</h2>
                
                <div className="space-y-4">
                  <div>
                    <LocationInput
                      label="Pickup Location"
                      placeholder="Search or click on map"
                      onLocationSelect={(lat, lng, address) => {
                        setPickup({ lat, lng, address });
                        setSelectionMode(null);
                      }}
                      value={pickup?.address}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 w-full text-xs"
                      onClick={() => setSelectionMode("pickup")}
                    >
                      Click map to set pickup
                    </Button>
                  </div>

                  <div>
                    <LocationInput
                      label="Drop-off Location"
                      placeholder="Search or click on map"
                      onLocationSelect={(lat, lng, address) => {
                        setDropoff({ lat, lng, address });
                        setSelectionMode(null);
                      }}
                      value={dropoff?.address}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 w-full text-xs"
                      onClick={() => setSelectionMode("dropoff")}
                    >
                      Click map to set drop-off
                    </Button>
                  </div>
                </div>
              </div>

              {pickup && dropoff && (
                <TierSelector selectedTier={selectedTier} onTierSelect={setSelectedTier} />
              )}
            </Card>

            <FareSummary distance={distance} fare={fare} tier={selectedTier} />

            <Button
              className="w-full h-12 text-base font-semibold"
              disabled={!isBookingEnabled || isBooking}
              onClick={handleBooking}
            >
              {isBooking ? "Processing..." : "Book Now"}
            </Button>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 h-[400px] lg:h-full">
            <MapView
              pickup={pickup}
              dropoff={dropoff}
              onMapClick={handleMapClick}
            />
          </div>
        </div>
      </div>

      {bookingDetails && (
        <BookingConfirmation
          open={showConfirmation}
          onClose={handleConfirmationClose}
          bookingDetails={bookingDetails}
        />
      )}
    </div>
  );
};

export default Index;

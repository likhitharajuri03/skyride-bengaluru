import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LocationInputProps {
  label: string;
  placeholder: string;
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  value?: string;
}

export const LocationInput = ({ label, placeholder, onLocationSelect, value }: LocationInputProps) => {
  const [searchQuery, setSearchQuery] = useState(value || "");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a location");
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + ", Bengaluru"
        )}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        onLocationSelect(parseFloat(lat), parseFloat(lon), display_name);
        toast.success("Location selected");
      } else {
        toast.error("Location not found. Try clicking on the map.");
      }
    } catch (error) {
      toast.error("Failed to search location");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        {label}
      </Label>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button
          size="icon"
          onClick={handleSearch}
          disabled={isSearching}
          className="shrink-0"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

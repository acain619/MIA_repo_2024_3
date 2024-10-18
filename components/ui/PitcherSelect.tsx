"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PitcherSelect({ pitchers, currentPitcherId }) {
  const router = useRouter();

  const handlePitcherChange = (value) => {
    router.push(`/pitcher/${value}`);
  };

  return (
    <Select onValueChange={handlePitcherChange} value={currentPitcherId}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a pitcher" />
      </SelectTrigger>
      <SelectContent>
        {pitchers.map((pitcher) => (
          <SelectItem key={pitcher.id} value={pitcher.id}>
            {pitcher.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

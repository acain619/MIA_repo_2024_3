"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PitcherSelect({ pitchers, current_pitcher_id }) {
  const router = useRouter();

  const is_pitcher_change = (value:string) => {
    router.push(`/pitcher/${value}`);
  };

  return (
    <Select onValueChange={is_pitcher_change} value={current_pitcher_id}>
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

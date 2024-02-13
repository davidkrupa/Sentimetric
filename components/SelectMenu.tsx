"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateCurrentProfile } from "@/lib/actions/profile.actions";
import { SelectMenuProps } from "@/types";
const SelectMenu = ({ data, current }: SelectMenuProps) => {
  const currentProfile = data.find((profile) => profile._id === current);

  const handleChange = async (e: string) => {
    await updateCurrentProfile(e);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize block truncate w-40">
          {currentProfile?.jobTitle}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={"profiles"}
          onValueChange={(e) => handleChange(e)}
        >
          {data?.map((profile, i) => (
            <DropdownMenuRadioItem
              value={profile?._id}
              className="block truncate"
              key={`profile-${i}`}
            >
              {profile.jobTitle}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectMenu;

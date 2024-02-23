"use client";

import { ImSpinner2 } from "react-icons/im";

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
import { updateUserCurrentProfile } from "@/lib/actions/user.actions";
import { SelectMenuProps } from "@/types";
import { useEffect, useState } from "react";
const SelectMenu = ({ data, currentProfile }: SelectMenuProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [data, currentProfile]);

  const handleChange = async (e: string) => {
    setIsLoading(true);
    await updateUserCurrentProfile(e);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="capitalize flex truncate w-48 gap relative px-6"
        >
          <p className="truncate">{currentProfile?.jobTitle}</p>
          {isLoading && (
            <ImSpinner2 className="animate-spin-slow h-5 w-5 mr-3 text-primary absolute right-0 top-0 bottom-0 my-auto" />
          )}
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

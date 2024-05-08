"use client";

import { useEffect, useState } from "react";

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
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError } from "@/lib/utils";

const IdeaPicker = () => {
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, [data, currentProfile]);

  const handleChange = async (e: string) => {
    setIsLoading(true);
    await updateUserCurrentProfile(e);
  };

  const data = [
    {
      _id: "1",
      jobTitle: "Software Engineer",
    },
    {
      _id: "2",
      jobTitle: "Product Manager",
    },
    {
      _id: "3",
      jobTitle: "Designer",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="capitalize flex truncate w-48 gap relative px-6"
        >
          {/* <p className="truncate">{currentProfile?.jobTitle}</p> */}
          {isLoading && (
            <LoadingSpinner className="mr-3 h-4 w-4 absolute right-0 top-0 bottom-0 my-auto" />
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
              value={profile._id}
              className="relative block truncate group "
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

export default IdeaPicker;

"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

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
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError } from "@/lib/utils";
import { updatePickedIdeas } from "@/lib/actions/ideas.actions";
import { IdeaPickerProps } from "@/types";

const IdeaPicker = ({
  titles,
  index,
  currentIdea,
  currentIdeaError,
}: IdeaPickerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: string) => {
    setIsLoading(true);
    const picked = await updatePickedIdeas(e, index);
    if (picked?.error) {
      showToastError(picked.error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="capitalize flex truncate w-52 gap pl-4 pr-3 "
          >
            <p className="truncate mr-4">
              {currentIdea?.title ?? titles[index]?.title}
            </p>
            <div className="size-4">
              <FaChevronDown className="text-foreground" />
            </div>
            {isLoading && (
              <LoadingSpinner className="mr-3 h-5 w-5 absolute -right-10 top-0 bottom-0 my-auto" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Project</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={"profiles"}
            onValueChange={(e) => handleChange(e)}
          >
            {titles?.map((title, i) => (
              <DropdownMenuRadioItem
                value={title.id}
                className="relative block truncate group "
                key={`profile-${i}`}
              >
                {title.title}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default IdeaPicker;

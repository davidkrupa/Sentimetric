"use client";

import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaXmark } from "react-icons/fa6";

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { deleteProfile } from "@/lib/actions/profile.actions";
import { createActivity } from "@/lib/actions/activities.actions";
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
              value={profile._id}
              className="relative block truncate group "
              key={`profile-${i}`}
            >
              {profile.jobTitle}
              <DeleteProfileDialog id={profile._id} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectMenu;

const DeleteProfileDialog = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    await deleteProfile(id);
    await createActivity("profile", "removed");
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="inline align-baseline absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="xs"
            variant="outline"
            className="px-1 hover:bg-background"
          >
            <FaXmark className="text-destructive" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl grid gap-8">
          <DialogHeader>
            <DialogTitle>Delete Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-muted-foreground text-md leading-relaxed">
            <p>
              Are you sure you want to delete this profile? This action cannot
              be undone. All the data from this profile, including analysis,
              ideas, and projects, will be deleted.
            </p>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

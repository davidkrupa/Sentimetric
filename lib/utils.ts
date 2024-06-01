import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { toast } from "@/components/ui/use-toast";
import { FormatTextResults } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// after changing everything to getErrorMessage - remove
export const handleError = (error: unknown): Error => {
  if (typeof error === "object" && error !== null && "message" in error) {
    return new Error((error as Error).message);
  } else {
    return new Error("Something went wrong");
  }
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const getShortenedList = (list: string[], maxLength: number) => {
  if (list.length === 0) return list;

  let totalChars = 0;

  for (let i = 0; i < list.length; i++) {
    totalChars += list[i].length;

    if (totalChars > maxLength) {
      return list.slice(0, i - 1);
    }
  }
  return list;
};

export const showToastError = (errorMessage: string) => {
  toast({
    title: "Something went wrong!",
    description: errorMessage,
    variant: "error",
  });
};

export const showToastSuccess = (succesMessage: string) => {
  toast({
    title: "Success!",
    description: succesMessage,
    variant: "success",
  });
};

export const formatText = (text: string | undefined) => {
  if (!text) return [];
  // Split text into lines
  const lines = text.split("\n");

  let results: FormatTextResults[] = [];

  // Loop through each line
  lines.forEach((line) => {
    // Check if the line starts with a number followed by a period and space
    if (/^\d+\.\s/.test(line.trim())) {
      // Split line by " - " to separate title and explanation
      const [indexAndTitle, explanation] = line.split(" - ");
      // Extract index and title
      const [index, title] = indexAndTitle.split(". ");
      // Push into results array
      results.push({
        index: parseInt(index) - 1,
        title: title?.trim(),
        explanation: explanation?.trim(),
      });
    }
  });

  return results;
};

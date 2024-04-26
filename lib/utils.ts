import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

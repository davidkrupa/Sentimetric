import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
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

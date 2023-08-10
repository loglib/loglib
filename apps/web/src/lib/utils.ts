import { twMerge, type ClassNameValue } from "tailwind-merge";

export const cn = (...inputs: ClassNameValue[]) => {
    return twMerge(inputs);
};

export function hexToRgb(hex: string): number[] {
    // Remove the "#" character from the beginning of the hex color code
    hex = hex.replace("#", "");

    // Convert the hex color code to an integer
    const hexInt = parseInt(hex, 16);

    // Extract the red, green, and blue components from the hex color code
    const red = (hexInt >> 16) & 255;
    const green = (hexInt >> 8) & 255;
    const blue = hexInt & 255;

    // Return an array of the RGB values
    return [red, green, blue];
}

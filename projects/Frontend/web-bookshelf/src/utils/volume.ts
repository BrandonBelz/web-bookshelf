import type { Volume, VolumeMinimal } from "../types/volumes";

export function getVolumeTitle(volume: VolumeMinimal | Volume): string {
  if (volume.title) return volume.title;
  if (volume.books && volume.books.length > 0) return volume.books[0].title;
  return "Untitled";
}

import type { VolumeMinimal } from "./volumes";

export interface VolumeSet {
  id: number;
  title: string;
  volumes: VolumeMinimal[];
  createdAt: string;
  updatedAt: string;
};

export interface VolumeSetMinimal {
  id: number;
  title: string;
  volumes: VolumeMinimal[];
};

export interface VolumeSetCreateRequest {
  title: string;
  volumeIds: number[];
};

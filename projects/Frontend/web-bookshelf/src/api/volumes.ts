import type { VolumeMinimal, Volume, VolumeCreateRequest } from "../types/volumes";
import apiClient from "./client";

export function getVolumes() {
  return apiClient.get<VolumeMinimal[]>("/volumes");
};

export function getVolumeById(id: number) {
  return apiClient.get<Volume>(`/volumes/${id}`);
};

export function createVolume(volume: VolumeCreateRequest) {
  return apiClient.post<Volume>("/volumes", volume);
};

export function deleteVolume(id: number) {
  return apiClient.delete<void>(`/volumes/${id}`);
};

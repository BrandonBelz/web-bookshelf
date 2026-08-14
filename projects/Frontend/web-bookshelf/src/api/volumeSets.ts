import apiClient from "./client";
import type { VolumeSetMinimal, VolumeSet, VolumeSetCreateRequest } from "../types/volumeSets";

export function getVolumeSets() {
  return apiClient.get<VolumeSetMinimal[]>("/volume-sets");
};

export function getVolumeSetById(id: number) {
  return apiClient.get<VolumeSet>(`/volume-sets/${id}`);
};

export function createVolumeSet(volumeSet: VolumeSetCreateRequest) {
  return apiClient.post<VolumeSet>("/volume-sets", volumeSet);
};

export function deleteVolumeSet(id: number) {
  return apiClient.delete<void>(`/volume-sets/${id}`);
};

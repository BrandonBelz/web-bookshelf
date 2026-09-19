import apiClient from "./client";
import type { VolumeSetMinimal, VolumeSet, VolumeSetCreateRequest } from "../types/volumeSets";

export function getVolumeSets() {
  return apiClient.get<VolumeSetMinimal[]>("/volumesets");
};

export function getVolumeSetById(id: number) {
  return apiClient.get<VolumeSet>(`/volumesets/${id}`);
};

export function createVolumeSet(volumeSet: VolumeSetCreateRequest) {
  return apiClient.post<VolumeSet>("/volumesets", volumeSet);
};

export function deleteVolumeSet(id: number) {
  return apiClient.delete<void>(`/volumesets/${id}`);
};

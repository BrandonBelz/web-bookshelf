import ListPage from "./ListPage";
import type { VolumeMinimal } from "../types/volumes";
import { getVolumes } from "../api/volumes";
import VolumeCard from "./VolumeCard";

export default function VolumesPage() {
  return (
    <ListPage<VolumeMinimal>
      pageTitle="Volumes"
      fetchData={getVolumes}
      renderCard={(volume) => <VolumeCard volume={volume} />}
    />
  )
}

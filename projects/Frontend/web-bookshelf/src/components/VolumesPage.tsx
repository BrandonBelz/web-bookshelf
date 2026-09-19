import ListPage from "./ListPage";
import type { VolumeMinimal } from "../types/volumes";
import { getVolumes } from "../api/volumes";
import VolumeCard from "./VolumeCard";
import AddVolumeCard from "./AddVolumeCard";

export default function VolumesPage() {
  return (
    <ListPage<VolumeMinimal>
      pageTitle="Volumes"
      fetchData={getVolumes}
      prependCard={<AddVolumeCard />}
      renderCard={(volume) => <VolumeCard volume={volume} />}
    />
  );
}

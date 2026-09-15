import { SceneProvider } from "@/lib/scene-engine/SceneContext";
import { ExhibitionShell } from "@/components/exhibition/ExhibitionShell";

export default function Home() {
  return (
    <SceneProvider>
      <ExhibitionShell />
    </SceneProvider>
  );
}

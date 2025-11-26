import { ThreeBackground } from "@/components/ThreeBackground";
import { BiographyHorizontal } from "@/components/BiographyHorizontal";

export default function BiographyPage() {
  return (
    <div className="relative min-h-screen text-white">
      <ThreeBackground />
      <div id="contents" className="relative z-10">
        <BiographyHorizontal />
      </div>
    </div>
  );
}

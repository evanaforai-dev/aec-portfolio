import { ProjectGrid } from "@/components/ProjectGrid";
import { Masthead } from "@/components/Masthead";

/**
 * Home = a masthead, then the project index: designed objects placed on a
 * persistent architectural grid. The grid owns its own layout and measures
 * itself against whatever the masthead leaves it (see ProjectGrid).
 */
export default function HomePage() {
  return (
    <>
      <Masthead />
      <ProjectGrid />
    </>
  );
}

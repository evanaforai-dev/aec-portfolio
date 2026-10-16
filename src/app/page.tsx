import { HomeGrid } from "@/components/home/HomeGrid";
import { home } from "@/data/home";

/**
 * Home = the grid, edge to edge. Portraits mark the sections (who, then
 * company work, then after hours), the red ball carries the links, and every
 * line of the grid is elastic. See components/home/engine.js.
 */
export default function HomePage() {
  return <HomeGrid config={home} />;
}

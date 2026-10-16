import type { MediaAsset } from "@/types/caseStudy";
import { asset as assetUrl } from "@/lib/asset";

/**
 * Renders a case-study asset. Video autoplays muted + looped as a silent
 * visual sequence (no controls/chrome). GIFs and images use <img>.
 */
export function Media({
  asset,
  className = "",
  fit = "cover",
  position,
}: {
  asset: MediaAsset;
  className?: string;
  fit?: "cover" | "contain";
  position?: string;
}) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  if (asset.type === "video") {
    return (
      <video
        src={assetUrl(asset.src)}
        poster={assetUrl(asset.poster)}
        autoPlay
        muted
        loop
        playsInline
        aria-label={asset.alt}
        className={`${fitClass} ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetUrl(asset.src)}
      alt={asset.alt ?? ""}
      loading="lazy"
      width={asset.width}
      height={asset.height}
      style={position ? { objectPosition: position } : undefined}
      className={`${fitClass} ${className}`}
    />
  );
}

/** Centered page container (wide measure for media + metadata rails). */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

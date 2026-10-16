import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-shell flex-col items-start px-6 py-16 md:px-10 md:py-28">
      <p className="label mb-6">404</p>
      <h1 className="measure t-display text-fg">
        this page doesn&apos;t exist.
      </h1>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-[24px] items-center t-note text-accent underline-offset-4 hover:underline"
      >
        back to home
      </Link>
    </div>
  );
}

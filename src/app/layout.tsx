import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { Motion } from "@/components/Motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RouteCurtain } from "@/components/RouteCurtain";
import { site, masthead } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

/*
 * A cold link is often the whole first impression: a recruiter pastes the url
 * into a message and what unfurls is the title and the description. "evana
 * sajan pallivathukkal, product designer" as both left the second line saying
 * nothing the first had not. The description now carries the work.
 */
const description = `${site.role}. ${masthead.statement}`;

/*
 * Absolute base for the social card. A static export served under a basePath
 * cannot infer its own origin, and og:image is one of the few tags that has
 * to be absolute or it is simply dropped.
 */
const baseUrl = `https://evanaforai-dev.github.io${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;

/*
 * The card itself. The tags above were written for the recruiter-pastes-a-url
 * case and then left it half done: the unfurl carried a title and a line of
 * text and no image at all, which for a designer's link is the one thing it
 * should carry. The card is the masthead set in the site's own two colours,
 * so it says the same thing the page says. Replace `/og.png` to change it.
 */
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.role}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    title: `${site.name}, ${site.role}`,
    description,
    siteName: site.name,
    url: baseUrl,
    images: [ogImage],
  },
  twitter: {
    // The card has to be declared large or the image is shown as a thumbnail
    // beside the text, which is worse than no image.
    card: "summary_large_image",
    title: `${site.name}, ${site.role}`,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <ThemeProvider>
          <Motion>
            <SmoothScroll />
            <Nav />
            {/* Clears the fixed nav (60px) with a deliberate gap, and no more:
              on the index every pixel here comes out of the artwork. */}
            <main className="pt-[4.5rem] md:pt-[5.5rem]">{children}</main>
            <Footer />
            <RouteCurtain />
          </Motion>
        </ThemeProvider>
      </body>
    </html>
  );
}

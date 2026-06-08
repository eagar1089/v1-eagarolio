import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { ThemeProvider } from "../components/ThemeProvider";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Projects } from "../components/sections/Projects";
import { Contact } from "../components/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
      meta: [
      { title: "Sagar³ — DevOps & Full‑Stack Developer (Early Career)" },
      {
        name: "description",
        content:
          "Early‑career DevOps‑minded full‑stack developer focused on CI/CD, automation, and dependable deployments. Open to learning and collaboration.",
      },
      { property: "og:title", content: "Sagar³ — DevOps & Full‑Stack Developer (Early Career)" },
      {
        property: "og:description",
        content: "DevOps and full‑stack developer building reliable tools and learning on the job.",
      },
    ],
  }),
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-200 focus:bg-accent focus:text-(--navy) focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to Content
      </a>
      <Loader onFinish={() => setLoaded(true)} />
      <main
        id="content"
        style={{
          position: "relative",
          zIndex: 1,
          filter: loaded ? "blur(0px)" : "blur(6px)",
          transition: "filter 0.4s ease",
        }}
      >
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </ThemeProvider>
  );
}

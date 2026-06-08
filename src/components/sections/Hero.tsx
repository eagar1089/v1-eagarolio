import { HoverArrow } from "../HoverArrow";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center max-w-280 mx-auto px-6 md:px-12 pt-24">
      <h1
        className="hero-line d2 font-bold leading-[1.1] text-center mb-6 hero-brand-text"
        style={{ fontSize: "clamp(48px,10vw,96px)" }}
      >
        Sagar Parab
      </h1>

      <p
        className="hero-line d3 hero-tagline text-center max-w-2xl mx-auto mb-4"
        style={{
          fontSize: "clamp(18px,4vw,24px)",
          lineHeight: 1.6,
        }}
      >
        Hi — I’m Sagar, a DevOps‑minded full‑stack developer building reliable tools and learning every day.
      </p>

      <p
        className="hero-line d3 hero-tagline text-center max-w-2xl mx-auto mb-4"
        style={{ fontSize: "clamp(16px,3.8vw,20px)", lineHeight: 1.6 }}
      >
        I focus on practical automation, simple interfaces, and dependable deployments. Available for projects, collaborations, and hands‑on learning opportunities.
      </p>

      <div className="hero-line d4 flex gap-4 flex-wrap justify-center mt-10">
        <a
          href="#projects"
          className="hover-arrow btn-primary px-7 py-3 md:py-4 rounded-lg transition-all hover:opacity-95"
          style={{ fontSize: "14px" }}
        >
          View My Work
          <HoverArrow size={13} />
        </a>
        <a
          href="#contact"
          className="hover-arrow btn-secondary glass px-7 py-3 md:py-4 rounded-lg transition-all"
          style={{ fontSize: "14px" }}
        >
          Get in Touch
          <HoverArrow size={13} />
        </a>
      </div>
    </section>
  );
}

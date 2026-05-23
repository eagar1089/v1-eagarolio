export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center max-w-280 mx-auto px-6 md:px-12 pt-24">
      {/* Main Heading */}
      <h1
        className="hero-line d2 font-bold leading-[1.1] text-center mb-6"
        style={{ fontSize: "clamp(48px,10vw,96px)" }}
      >
        Sagar³
      </h1>

      {/* Tagline */}
      <p
        className="hero-line d3 text-center max-w-2xl mx-auto mb-4"
        style={{
          color: "var(--fg-muted)",
          fontSize: "clamp(18px,4vw,24px)",
          lineHeight: 1.6,
        }}
      >
        Hi — I’m Sagar, a DevOps‑minded full‑stack developer building reliable tools and learning every day.
      </p>

      <p
        className="hero-line d3 text-center max-w-2xl mx-auto mb-4"
        style={{ color: "var(--fg-muted)", fontSize: "clamp(16px,3.8vw,20px)", lineHeight: 1.6 }}
      >
        I focus on practical automation, simple interfaces, and dependable deployments. Available for projects, collaborations, and hands‑on learning opportunities.
      </p>

      {/* Subheading */}
      {/* CTA Buttons */}
      <div className="hero-line d4 flex gap-4 flex-wrap justify-center mt-10">
        <a
          href="#projects"
          className="px-7 py-3 md:py-4 rounded-lg transition-all hover:opacity-90"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            background: "var(--gradient-accent)",
            color: "var(--bg)",
            fontWeight: 600,
            boxShadow: "var(--shadow-soft)",
          }}
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="px-7 py-3 md:py-4 rounded-lg transition-all glass"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--accent)",
          }}
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}

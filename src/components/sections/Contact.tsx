import { Reveal } from "../Reveal";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <Reveal>
        <div className="max-w-280 mx-auto px-6 md:px-12">
          {/* Lead CTA */}
          <div
            className="mb-12 p-8 md:p-12 rounded-2xl glass text-center"
            style={{ borderColor: "rgba(var(--accent-rgb), 0.26)" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--fg)" }}>
              Let's build something memorable
            </h2>
            <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              I build practical infrastructure and developer tooling for small projects and prototypes. I enjoy improving reliability and learning new approaches — tell me about your goals and we can figure out a plan together.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="mailto:sgrp9801@gmail.com?subject=Project%20Enquiry"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg transition-all hover:opacity-95"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  background: "var(--gradient-accent)",
                  color: "var(--bg)",
                  fontWeight: 700,
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                Start a conversation
              </a>

              <a
                href="https://calendly.com/your-availability"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg transition-all border"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  background: "transparent",
                  color: "var(--fg)",
                  borderColor: "rgba(var(--accent-rgb),0.14)",
                }}
              >
                Book a call
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="glass p-4 rounded-lg text-left">
                <h4 className="font-semibold" style={{ color: "var(--fg)" }}>
                  Infrastructure
                </h4>
                <p style={{ color: "var(--fg-muted)", marginTop: 6 }}>
                  Basic cloud deployments, Terraform for repeatable setups, and simple monitoring to keep projects reliable.
                </p>
              </div>
              <div className="glass p-4 rounded-lg text-left">
                <h4 className="font-semibold" style={{ color: "var(--fg)" }}>
                  CI / CD
                </h4>
                <p style={{ color: "var(--fg-muted)", marginTop: 6 }}>
                  Automated pipelines, testing and safe deploys — shipping faster with confidence.
                </p>
              </div>
              <div className="glass p-4 rounded-lg text-left">
                <h4 className="font-semibold" style={{ color: "var(--fg)" }}>
                  Consulting
                </h4>
                <p style={{ color: "var(--fg-muted)", marginTop: 6 }}>
                  I offer hands‑on help with implementation, code reviews, and practical suggestions — happy to work closely and learn together.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t pt-10" style={{ borderColor: "var(--border)" }}>
            <div className="mt-12 pt-8 text-xs" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
              <p>© 2026 Sagar Parab. All rights reserved.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

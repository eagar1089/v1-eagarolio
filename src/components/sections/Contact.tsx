import { HoverArrow } from "../HoverArrow";
import { Reveal } from "../Reveal";

export function Contact() {
  return (
    <section id="contact" className="py-24 scroll-mt-24">
      <Reveal>
        <div className="max-w-280 mx-auto px-6 md:px-12">
          <div className="section-heading-row justify-center sm:justify-start">
            <h2 className="section-title text-3xl md:text-4xl mb-0">
              <span className="font-mono text-accent-fg text-lg md:text-xl font-normal mr-2">04.</span>
              Contact
            </h2>
            <span className="section-rule hidden sm:block" aria-hidden />
          </div>
          <div className="glass-card glass-card-interactive mb-12 p-8 md:p-12 text-center -mt-2">
            <h3 className="section-title text-2xl md:text-3xl mb-4">
              Let’s Build Something Reliable Together
            </h3>
            <p className="section-lead text-base md:text-lg mb-4 max-w-2xl mx-auto">
              Passionate about building scalable infrastructure, automating deployments, and improving system reliability.
            </p>

            <p className="section-lead text-base md:text-lg mb-4 max-w-2xl mx-auto">
              Currently exploring opportunities in DevOps Engineering, Linux Administration, Cloud Infrastructure, and Platform Engineering.
            </p>

            <p className="section-lead text-base md:text-lg mb-8 max-w-2xl mx-auto">
              If you’re looking for someone who enjoys automation, monitoring, CI/CD pipelines, Docker, Kubernetes, and solving production challenges — let’s connect.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="mailto:sgrp9801@gmail.com?subject=Project%20Enquiry"
                className="hover-arrow btn-primary px-6 py-3 rounded-lg transition-all hover:opacity-95"
                style={{ fontSize: "14px" }}
              >
                Get In Touch
                <HoverArrow size={13} />
              </a>

              <a
                href="https://calendly.com/your-availability"
                target="_blank"
                rel="noreferrer"
                className="hover-arrow btn-secondary glass px-5 py-3 rounded-lg transition-all"
                style={{ fontSize: "14px" }}
              >
                Book a call
                <HoverArrow size={13} />
              </a>
            </div>
          </div>

          <div className="text-center border-t pt-10" style={{ borderColor: "var(--border)" }}>
            <div className="mt-12 pt-8 text-xs text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              <p>© 2026 Sagar Parab. All rights reserved.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

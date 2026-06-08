import { HoverArrow } from "../HoverArrow";
import { Reveal } from "../Reveal";

export function About() {
  return (
    <>
      <section id="about" className="py-24 scroll-mt-24">
        <div className="max-w-280 mx-auto px-6 md:px-12">
          <Reveal>
            <div className="section-heading-row">
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-0 leading-tight">
                <span className="font-mono text-accent-fg text-lg md:text-xl font-normal mr-2">01.</span>
                About
              </h2>
              <span className="section-rule hidden sm:block" aria-hidden />
            </div>
            <div className="max-w-3xl -mt-4">
              <p className="section-lead text-xl md:text-2xl font-medium text-body mb-6">
                Practical engineering, learning every day.
              </p>
              <p className="section-lead text-base md:text-lg mb-6">
                I’m a Linux administrator and BE CSE student with professional experience at Justdial Pvt. Ltd. from November 2021 to February 2024. Linux administration was my main role, and I also got opportunities to work on internal server monitoring dashboards, server inventory, live statistics fetching, and internal web tools.
              </p>
              <p className="section-lead text-base md:text-lg">
                I enjoy solving practical problems, improving reliability, and writing code that’s easy to understand and maintain. I’m currently in my final year of BE CSE and expected to pass out in June 2026, so I’m looking to grow with a team where I can keep learning and contribute meaningfully.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 max-w-280 mx-auto px-6 md:px-12">
        <Reveal>
          <div className="section-heading-row">
            <h2 className="section-title text-3xl md:text-4xl mb-0">
              <span className="font-mono text-accent-fg text-lg md:text-xl font-normal mr-2">02.</span>
              Skills
            </h2>
            <span className="section-rule hidden sm:block" aria-hidden />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 -mt-2">
            {[
              {
                title: "DevOps & Cloud (AWS)",
                description:
                  "Basic to intermediate experience with AWS deployments and simple provisioning; actively learning best practices.",
              },
              {
                title: "CI/CD & Automation",
                description:
                  "GitHub Actions for testing, builds and deploys; building repeatable pipelines and automations.",
              },
              {
                title: "Containers & Local Dev (Docker)",
                description: "Containerizing services, local composition, and improving developer workflows with Docker.",
              },
              {
                title: "Web Development (React / Node.js)",
                description:
                  "Frontend interfaces and lightweight backend services for prototypes and internal tools (basic to intermediate).",
              },
              {
                title: "Linux & Scripting",
                description:
                  "Day‑to‑day Linux tasks, Bash and small Python scripts for automation; continuing to learn more advanced tooling.",
              },
              {
                title: "Databases (MySQL / MongoDB)",
                description:
                  "Experience with relational and document databases for internal tools: writing queries, handling CRUD APIs, basic schema design, indexing, and backup-oriented workflows.",
              },
            ].map((service, i) => (
              <div key={i} className="glass-card glass-card-interactive p-6">
                <h3 className="card-title text-lg font-semibold mb-3 pr-8">{service.title}</h3>
                <p className="card-body text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

import { Reveal } from "../Reveal";

export function About() {
  return (
    <>
      {/* Premium Intro Section */}
      <section className="py-24 bg-gradient-to-br from-transparent via-transparent to-transparent">
        <div className="max-w-280 mx-auto px-6 md:px-12">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ color: "var(--fg)" }}>
                Practical engineering, learning every day.
              </h2>
              <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                I’m a Linux administrator and BE CSE student with professional experience at Justdial Pvt. Ltd. from November 2021 to February 2024. Linux administration was my main role, and I also got opportunities to work on internal server monitoring dashboards, server inventory, live statistics fetching, and internal web tools.
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                I enjoy solving practical problems, improving reliability, and writing code that’s easy to understand and maintain. I’m currently in my final year of BE CSE and expected to pass out in June 2026, so I’m looking to grow with a team where I can keep learning and contribute meaningfully.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services/Benefits Grid */}
      <section className="py-24 max-w-280 mx-auto px-6 md:px-12">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ color: "var(--fg)" }}>
            Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div
                key={i}
                className="p-6 rounded-xl glass transition-all hover:border-accent/50"
                style={{ borderColor: "var(--border)" }}
              >
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--fg)" }}>
                  {service.title}
                </h3>
                <p style={{ color: "var(--fg-muted)" }} className="text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

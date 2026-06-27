import { Github, ExternalLink } from "lucide-react";
import { Reveal } from "../Reveal";

const PROJECTS = [
  {
    id: 1,
    title: "Digital MemoryJar",
    description:
      "A small full-stack app for capturing shared memories through text, photos, and voice notes. I built the timeline UI and worked on backend endpoints and S3 image uploads.",
    details:
      "Built timeline UI and S3 uploads | learning serverless processing",
    tech: ["React", "Express", "MongoDB", "AWS S3"],
    github: "https://github.com/eagar1089/Digital-MemoryJar",
    live: "#",
    image: "https://opengraph.githubassets.com/1/eagar1089/Digital-MemoryJar",
  },
  {
    id: 2,
    title: "IoT Production Tracker",
    description:
      "Prototype for a simple production line monitor that ingests sensor data and visualizes key metrics. I helped implement MQTT ingestion and dashboard components.",
    details:
      "Contributed MQTT ingestion and dashboard UI | learning observability patterns",
    tech: ["Node.js", "MQTT", "InfluxDB", "React", "Grafana"],
    github: "https://github.com/eagar1089/IoT-Production-Tracker",
    live: "#",
    image:
      "https://opengraph.githubassets.com/1/eagar1089/IoT-Production-Tracker",
  },
  {
    id: 3,
    title: "K8s Local Deployment",
    description:
      "A reproducible Kubernetes lab using Minikube and Helm for learning container orchestration and service composition.",
    details:
      "Local Minikube + Helm lab for dev testing | documentation and student-friendly setup",
    tech: ["Kubernetes", "Helm", "Docker", "Bash"],
    github: "https://github.com/eagar1089",
    live: "#",
    image: "https://placehold.co/800x500?text=K8s+Deployment",
  },
  {
    id: 4,
    title: "CI/CD Pipeline Automation",
    description:
      "Automation of CI/CD workflows using Jenkins and GitHub Actions to improve developer feedback loops and reduce manual deployment steps.",
    details:
      "Implemented pipeline templates and automated tests | improved deploy consistency",
    tech: ["Jenkins", "GitHub Actions", "Docker", "Python"],
    github: "https://github.com/eagar1089",
    live: "#",
    image: "https://placehold.co/800x500?text=CI%2FCD+Pipeline",
  },
  {
    id: 5,
    title: "Cloud Infrastructure Manager",
    description:
      "Terraform work to automate simple cloud infrastructure for small projects and labs with repeatable versioned deployments.",
    details: "Terraform modules for small deployments | practicing IaC workflows",
    tech: ["Terraform", "AWS", "Azure", "Python", "Go"],
    github: "https://github.com/eagar1089",
    live: "#",
    image: "https://placehold.co/800x500?text=Cloud+Infrastructure",
  },
];

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  return (
    <article
      className="
        group overflow-hidden rounded-2xl border border-white/10
        bg-slate-900/55 shadow-2xl shadow-black/20 backdrop-blur
        transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40
      "
    >
      <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[190px] overflow-hidden sm:min-h-[260px] lg:min-h-full">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 rounded-full border border-cyan-300/30 bg-black/45 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur">
            Project {index + 1}/{PROJECTS.length}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-7">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              Featured Project
            </p>
            <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              {project.title}
            </h3>
          </div>

          <p className="text-sm leading-7 text-slate-200 sm:text-base">
            {project.description}
          </p>

          <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-6 text-slate-300 sm:text-sm">
            {project.details}
          </p>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-cyan-200">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/30 px-4 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/10"
            >
              <Github size={18} />
              GitHub
            </a>

            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <ExternalLink size={18} />
              Live Preview
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <Reveal>
        <div className="mb-10 sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            03. Projects
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Selected Work
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            A selection of recent projects showcasing infrastructure design,
            DevOps solutions, and full-stack development.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 sm:gap-8">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
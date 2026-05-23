import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Reveal } from "../Reveal";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "IoT Production Tracker",
    description:
      "Prototype for a simple production line monitor that ingests sensor data and visualizes key metrics. I helped implement MQTT ingestion and worked on dashboard components.",
    details: "Contributed MQTT ingestion and dashboard UI | learning observability patterns",
    tech: ["Node.js", "MQTT", "InfluxDB", "React", "Grafana"],
    github: "https://github.com/eagar1089",
    live: "#",
    image: "https://placehold.co/600x400?text=IoT+Production+Tracker",
  },
  {
    id: 2,
    title: "Digital MemoryJar",
    description:
      "A small full‑stack app for capturing shared memories (text, photos, voice notes). I built the timeline UI and worked on backend endpoints and S3 image uploads.",
    details: "Built timeline UI and S3 uploads | learning serverless processing",
    tech: ["React", "Express", "MongoDB", "AWS S3"],
    github: "https://github.com/eagar1089",
    live: "#",
    image: "https://placehold.co/600x400?text=Digital+MemoryJar",
  },
  {
    id: 3,
    title: "K8s Local Deployment",
    description:
      "A reproducible Kubernetes lab (Minikube + Helm) for learning container orchestration and service composition. Useful for prototyping and testing concepts locally.",
    details: "Local Minikube + Helm lab for dev testing | documentation and student-friendly setup",
    tech: ["Kubernetes", "Helm", "Docker", "Bash"],
    github: "https://github.com/eagar1089",
    live: "#",
    image: "https://placehold.co/600x400?text=K8s+Deployment",
  },
  {
    id: 4,
    title: "CI/CD Pipeline Automation",
    description:
      "Automation of CI/CD workflows using Jenkins and GitLab/GitHub Actions to improve developer feedback loops and reduce manual steps in deployments.",
    details: "Implemented pipeline templates and automated tests | improved deploy consistency",
    tech: ["Jenkins", "GitLab CI", "Docker", "Python"],
    github: "https://github.com/eagar1089",
    live: "#",
    image: "https://placehold.co/600x400?text=CI%2FCD+Pipeline",
  },
  {
    id: 5,
    title: "Cloud Infrastructure Manager",
    description:
      "Terraform work to automate simple cloud infrastructure (small projects and labs). Focused on repeatable, versioned deployments and learning IaC patterns.",
    details: "Terraform modules for small deployments | practicing IaC workflows",
    tech: ["Terraform", "AWS", "Azure", "Python", "Go"],
    github: "https://github.com/eagar1089",
    live: "#",
    image: "https://placehold.co/600x400?text=Cloud+Infrastructure",
  },
];

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div
      className="project-card glass"
      data-index={index}
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        height: "80vh",
        width: "85vw",
        maxWidth: "1200px",
        borderRadius: "24px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex flex-col h-full gap-6">
        {/* Header with Badge */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: "var(--fg)" }}>
              {project.title}
            </h3>
          </div>
          <div
            className="text-xs md:text-sm px-3 py-1 rounded-full font-medium"
            style={{
              backgroundColor: "rgba(var(--accent-rgb), 0.2)",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              border: "1px solid rgba(var(--accent-rgb), 0.4)",
              whiteSpace: "nowrap",
            }}
          >
            Project {index + 1}/{PROJECTS.length}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative overflow-hidden rounded-xl shrink-0" style={{ height: "32%", aspectRatio: "16 / 9" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
              transition: "transform 500ms cubic-bezier(0.33, 0.66, 0.66, 1)",
            }}
          />
          <div className="card-dim" />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col gap-4 pr-2 project-content">
          {/* Description */}
          <div>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--fg)", opacity: 0.95 }}>
              {project.description}
            </p>
          </div>

          {/* Details */}
          <div className="text-xs md:text-sm p-3 rounded-lg details">
            {project.details}
          </div>

          {/* Tech Stack */}
          <div>
            <p
              className="text-xs md:text-sm mb-3 font-semibold"
              style={{ color: "var(--fg)", opacity: 0.8 }}
            >
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: "rgba(var(--accent-rgb), 0.15)",
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    border: "1px solid rgba(var(--accent-rgb), 0.3)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-3 shrink-0 flex-wrap pt-4 border-t border-opacity-20" style={{ borderColor: "var(--accent)" }}>
          <a
            href={project.github}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group"
            style={{
              backgroundColor: "rgba(var(--accent-rgb), 0.1)",
              color: "var(--accent)",
              border: "1px solid rgba(var(--accent-rgb), 0.3)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(var(--accent-rgb), 0.2)";
              e.currentTarget.style.boxShadow = "0 4px 12px -4px rgba(100, 255, 218, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(var(--accent-rgb), 0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
          <a
            href={project.live}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--navy)",
              border: "1px solid var(--accent)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(100, 255, 218, 0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ExternalIcon />
            <span>Live Preview</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stackContainerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      if (!cards.length) return;

      const cardCount = cards.length;
      const maxScrollStep = Math.max(1, cardCount - 1);

      gsap.set(cards, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        y: 90,
        scale: 0.94,
        willChange: "transform, opacity",
      });

      // tuned stacking math with eased tweens for smoother bottom->center->top transitions
      const updateCards = (progress: number) => {
        const stackStep = progress * maxScrollStep;

        cards.forEach((card, index) => {
          const distance = index - stackStep; // negative => above center, positive => below center
          const abs = Math.abs(distance);

          // opacity falls off for non-focused cards
          const opacity = Math.max(0, 1 - abs * 1.2);

          // vertical offset: stronger travel for clear motion (below -> up -> above)
          const y = Math.round(distance * 180);

          // scale: focused card slightly larger, others reduced
          const scale = Math.max(0.88, 1 - Math.min(0.12, abs * 0.06));

          // zIndex: closest to center should be on top
          const zIndex = 2000 - Math.round(abs * 10) + (cardCount - index);

          // animate transforms for smoother interpolation
          gsap.to(card, {
            opacity,
            y,
            scale,
            duration: 0.55,
            ease: "power3.out",
            overwrite: true,
            willChange: "transform, opacity",
          });

          gsap.set(card, {
            zIndex,
            pointerEvents: opacity > 0.45 ? "auto" : "none",
          });
        });
      };

      // initial state (kept subtle)
      gsap.set(cards, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        y: 120,
        scale: 0.94,
        willChange: "transform, opacity",
      });

      // apply starting layout
      updateCards(0);

      const trigger = ScrollTrigger.create({
        trigger: stackContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateCards(self.progress),
      });

      return () => trigger.kill();
    }, stackContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-24" style={{ background: "transparent" }}>
      <Reveal>
        <div className="max-w-280 mx-auto px-6 md:px-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--fg)" }}>
            Recent Work
          </h2>
          <p style={{ color: "var(--fg-muted)" }} className="max-w-2xl text-base md:text-lg">
            A selection of recent projects showcasing infrastructure design, DevOps solutions, and full-stack development.
          </p>
        </div>
      </Reveal>

      {/* Stack Container */}
      <div
        ref={stackContainerRef}
        className="projects-stack-container relative"
        style={{
          height: "500vh",
          position: "relative",
        }}
      >
        <div
          ref={containerRef}
          style={{
            height: "100vh",
            position: "sticky",
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1200px",
          }}
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

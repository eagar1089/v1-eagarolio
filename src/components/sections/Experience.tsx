import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAREER_ENTRIES = [
  {
    id: "justdial",
    company: "JustDial Ltd.",
    role: "Linux Administrator",
    dateRange: "Nov 2021 - Feb 2024",
    points: [
      "Fully designed, implemented, and monitored company's internal server monitoring dashboards.",
      "Built real-time server inventory and live statistics fetching systems using PHP, MySQL, Python, MongoDB, Node.js.",
      "Administered and maintained Linux servers ensuring 99.9% uptime.",
    ],
  },
  {
    id: "student",
    company: "Full-Time Student (B.E. Computer Science)",
    role: "Returning to Academia",
    dateRange: "Mar 2023 - Present (Graduating June 2026)",
    points: [
      "Pursuing Bachelor's degree in Computer Engineering while building advanced projects.",
      "Leveraging 2+ years of industry experience to master DevOps, cloud architecture, and full-stack systems.",
      "Maintaining a 5+ GPA and contributing to open source.",
    ],
  },
  {
    id: "independent",
    company: "Independent Project Developer",
    role: "Portfolio & Skill Building",
    dateRange: "2024 - Present",
    points: [
      "Created full-stack applications and automation tools (see GitHub: https://github.com/eagar1089).",
      "Exploring Kubernetes, Terraform, and advanced CI/CD pipelines.",
      "Documenting learnings and sharing code with the developer community.",
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>(".career-card"));
    if (!cards.length) return;

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      gsap.set(cards, {
        position: "absolute",
        inset: 0,
        yPercent: (index) => index * 110,
        opacity: (index) => (index === 0 ? 1 : 0),
        scale: 0.95,
        zIndex: (index) => index + 1,
      });

      const stackTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        stackTimeline.to(
          card,
          {
            yPercent: 0,
            duration: 1,
            ease: "none",
          },
          index - 1
        );
      });

      const revealTriggers = cards.map((card, index) =>
        ScrollTrigger.create({
          trigger: section,
          start: `top+=${index * 38}% center`,
          end: `top+=${(index + 1) * 38}% center`,
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: () => {
            if (index === 0) return;
            gsap.to(card, {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              ease: "power1.out",
              overwrite: "auto",
            });
          },
        })
      );

      return () => {
        revealTriggers.forEach((trigger) => trigger.kill());
      };
    });

    media.add("(max-width: 767px)", () => {
      gsap.set(cards, { clearProps: "all" });

      const revealTriggers = cards.map((card) =>
        ScrollTrigger.create({
          trigger: card,
          start: "top 82%",
          end: "bottom 35%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.fromTo(
              card,
              { opacity: 0, scale: 0.95 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        })
      );

      return () => {
        revealTriggers.forEach((trigger) => trigger.kill());
      };
    });

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section id="experience" className="career-timeline py-24" ref={sectionRef}>
      <div className="max-w-280 mx-auto px-6 md:px-12">
        <h2 className="numbered-heading" data-num="02">
          Career Timeline
        </h2>

        <div className="career-scroll-space">
          <div className="career-sticky-stack">
            {CAREER_ENTRIES.map((entry) => (
              <article className="career-card" key={entry.id}>
                <div className="career-card-meta">
                  <p className="career-role">{entry.role}</p>
                  <p className="career-company">{entry.company}</p>
                  <p className="career-date">{entry.dateRange}</p>
                </div>

                <ul className="career-points">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";

type NowData = {
  updatedAt: string;
  currentlyLearning: string;
  reading: string;
  building: string;
};

const CACHE_KEY = "now-card-cache-v1";
const TTL_MS = 60 * 60 * 1000;

const FALLBACK: NowData = {
  updatedAt: "",
  currentlyLearning: "Karpenter & Kyverno",
  reading: "Designing Data-Intensive Applications",
  building: "A portfolio with cinematic interactions",
};

export function NowCard() {
  const [data, setData] = useState<NowData>(FALLBACK);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as { timestamp: number; data: NowData };
          if (Date.now() - parsed.timestamp < TTL_MS) {
            if (!ignore) setData(parsed.data);
            return;
          }
        }
      } catch {
        // Ignore bad cache values.
      }

      try {
        const response = await fetch("/now.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to fetch now.json");
        const json = (await response.json()) as NowData;
        if (!ignore) {
          setData(json);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: json }));
        }
      } catch {
        if (!ignore) setData(FALLBACK);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <aside className="now-card glass" aria-label="Current status">
      <h3>Now</h3>
      <ul>
        <li>
          <span aria-hidden="true">📚</span>
          <span>Currently learning: {data.currentlyLearning}</span>
        </li>
        <li>
          <span aria-hidden="true">📖</span>
          <span>Reading: {data.reading}</span>
        </li>
        <li>
          <span aria-hidden="true">🛠️</span>
          <span>Building: {data.building}</span>
        </li>
      </ul>
      {data.updatedAt && (
        <p className="now-updated">Updated: {new Date(data.updatedAt).toLocaleDateString()}</p>
      )}
    </aside>
  );
}

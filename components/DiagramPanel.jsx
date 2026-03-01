"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function DiagramPanel({ diagram }) {
  const ref = useRef(null);

  useEffect(() => {
    if (diagram && ref.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "loose",
        sequence: {
          diagramMarginX: 60,
          diagramMarginY: 30,
          actorMargin: 40,
          width: 220,
          height: 60
        }
      });
      ref.current.innerHTML = diagram;
      try {
        mermaid.init(undefined, ref.current);
      } catch (e) {
        console.error("Mermaid render error", e);
      }
    }
  }, [diagram]);

  const downloadSVG = () => {
    if (!ref.current) return alert("Nothing to download");

    const svg = ref.current.querySelector("svg");
    if (!svg) {
      alert("Diagram not rendered or too large to render. Try selecting a specific controller.");
      return;
    }

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sequence-diagram.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!diagram) return null;

  return (
    <div>
      <div className="diagram-wrapper">
        <div ref={ref} className="mermaid" />
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={downloadSVG}>Download SVG</button>
      </div>
    </div>
  );
}
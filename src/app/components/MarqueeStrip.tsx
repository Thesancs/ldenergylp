"use client";

const items = [
  "Petróleo Bruto",
  "✦",
  "Biomassa",
  "✦",
  "Óleo Combustível",
  "✦",
  "ISO 9001",
  "✦",
  "ISO 14001",
  "✦",
  "ISO 45001",
  "✦",
  "São Paulo",
  "✦",
  "Bahia",
  "✦",
  "Espírito Santo",
  "✦",
  "20 Anos de Mercado",
  "✦",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        backgroundColor: "var(--color-gold-pale)",
        overflow: "hidden",
        padding: "14px 0",
        borderTop: "none",
        borderBottom: "none",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-dark)",
              paddingRight: item === "✦" ? "24px" : "32px",
              paddingLeft: item === "✦" ? "24px" : "0",
              opacity: item === "✦" ? 0.5 : 1,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

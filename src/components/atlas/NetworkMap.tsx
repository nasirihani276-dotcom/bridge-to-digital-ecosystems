const nodes = [
  { x: 82, y: 74, r: 9, label: "طلا", tone: "var(--gold)", delay: 0 },
  { x: 232, y: 46, r: 7, label: "هوش مصنوعی", tone: "var(--teal)", delay: 0.6 },
  { x: 352, y: 108, r: 8, label: "رمزارز", tone: "var(--brand-glow)", delay: 1.1 },
  { x: 300, y: 232, r: 7, label: "صنایع خلاق", tone: "var(--brand-glow)", delay: 1.6 },
  { x: 128, y: 244, r: 8, label: "خطرپذیر", tone: "var(--brand-glow)", delay: 0.9 },
  { x: 46, y: 176, r: 6, label: "بیمه", tone: "var(--teal)", delay: 1.9 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 3],
  [1, 4],
];

export function NetworkMap() {
  return (
    <svg
      viewBox="0 0 400 290"
      role="img"
      aria-label="نمودار شبکه‌ای پیوند میان عرصه‌های اقتصاد دیجیتال"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="pol-core" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--brand-glow)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--brand-glow)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="145" r="120" fill="url(#pol-core)" opacity="0.25" />
      <circle
        cx="200"
        cy="145"
        r="118"
        fill="none"
        stroke="var(--ink-foreground)"
        strokeOpacity="0.14"
      />
      <circle
        cx="200"
        cy="145"
        r="78"
        fill="none"
        stroke="var(--ink-foreground)"
        strokeOpacity="0.1"
      />

      <g strokeWidth="1.4" fill="none">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a]!.x}
            y1={nodes[a]!.y}
            x2={nodes[b]!.x}
            y2={nodes[b]!.y}
            stroke="var(--brand-glow)"
            strokeOpacity="0.55"
            className="animate-dash-flow"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </g>

      {nodes.map((n) => (
        <g key={n.label}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r + 6}
            fill={n.tone}
            opacity="0.16"
            className="animate-node-pulse"
            style={{
              transformOrigin: `${n.x}px ${n.y}px`,
              animationDelay: `${n.delay}s`,
            }}
          />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.tone} />
          <text
            x={n.x}
            y={n.y + n.r + 17}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--ink-foreground)"
            fillOpacity="0.8"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

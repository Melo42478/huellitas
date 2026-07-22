/**
 * Generate a striped SVG placeholder image with a label.
 * Used for dogs without real photos (manchas, luna in seed data).
 */
export function generatePlaceholderSvg(label: string, tint = "#eadfce"): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'>
    <defs>
      <pattern id='s' width='28' height='28' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'>
        <rect width='28' height='28' fill='#f2e9d8'/>
        <rect width='14' height='28' fill='${tint}'/>
      </pattern>
    </defs>
    <rect width='800' height='800' fill='url(#s)'/>
    <text x='50%' y='50%' font-family='monospace' font-size='34' fill='#b0a08c' text-anchor='middle' dominant-baseline='middle'>
      ${label}
    </text>
  </svg>`;

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

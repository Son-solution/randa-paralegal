import { site } from "@/config/site";

type Props = { kind: "phone" | "email"; color?: string };

/** Shows a configured contact value, or "[folgt]" while it is not confirmed yet. */
export default function ContactValue({ kind, color = "#8A6508" }: Props) {
  const value = site.contact[kind];
  if (!value) return <span style={{ color }}>[folgt]</span>;
  const href = kind === "phone" ? `tel:${value.replace(/[^\d+]/g, "")}` : `mailto:${value}`;
  return (
    <a href={href} style={{ color }}>
      {value}
    </a>
  );
}

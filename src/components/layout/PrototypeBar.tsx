import { site } from "@/config/site";

/** Thin notice at the very top while the site is a prototype (see `site.showPrototypeBar`). */
export default function PrototypeBar() {
  if (!site.showPrototypeBar) return null;
  return (
    <div
      className="proto"
      role="note"
      style={{
        background: "#F3E7C4",
        color: "#3D2E05",
        fontSize: "12px",
        letterSpacing: ".04em",
        textAlign: "center",
        padding: "9px 20px",
        borderBottom: "1px solid #E0CB8C",
      }}
    >
      {site.prototypeNotice}
    </div>
  );
}

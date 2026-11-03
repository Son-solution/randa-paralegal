import Link from "next/link";
import { routes } from "@/config/navigation";
import { phoneHref } from "@/config/site";

type Props = { className?: string; describedBy?: string };

/** "Jetzt anrufen" button used in the closing call-to-action sections. */
export default function CallCta({ className = "btn btn-line", describedBy }: Props) {
  const href = phoneHref();
  if (href) {
    return (
      <a className={className} href={href} aria-describedby={describedBy}>
        Jetzt anrufen
      </a>
    );
  }
  return (
    <Link className={className} href={routes.intake} aria-describedby={describedBy}>
      Jetzt anrufen
    </Link>
  );
}

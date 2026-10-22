import Link from "next/link";
import { routes } from "@/config/navigation";
import { whatsappHref } from "@/config/site";

type Props = { className?: string; describedBy?: string };

/** "Per WhatsApp schreiben" button used in the closing call-to-action sections. */
export default function WhatsAppCta({ className = "btn btn-line", describedBy }: Props) {
  const href = whatsappHref();
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-describedby={describedBy}>
        Per WhatsApp schreiben
      </a>
    );
  }
  return (
    <Link className={className} href={routes.intake} aria-describedby={describedBy}>
      Per WhatsApp schreiben
    </Link>
  );
}

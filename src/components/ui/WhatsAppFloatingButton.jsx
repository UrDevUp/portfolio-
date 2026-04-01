import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WHATSAPP_NUMBER = "212638686444";
const DEFAULT_MESSAGE =
  "Bonjour 👋\nJe viens de visiter votre site UrDevUp et je suis intéressé(e) par la création d’un site web.\nPouvez-vous me donner plus d’informations ?";

export default function WhatsAppFloatingButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-5 right-4 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/10 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] md:bottom-6 md:right-6"
      title="Contact us on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-[30px] leading-none" />
    </a>
  );
}

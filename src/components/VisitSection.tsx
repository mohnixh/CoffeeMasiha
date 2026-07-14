import { ButtonLink, Eyebrow } from "./ui";

const socials = [
  {
    href: "https://www.instagram.com/mohnixh_/",
    label: "Instagram",
    icon: (
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm8.9 2.1a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    ),
  },
  {
    href: "mailto:mohdmohnish01@gmail.com",
    label: "Email",
    icon: (
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 7.4L4.4 7H4v.7l8 5.7 8-5.7V7h-.4L12 12.4Z" />
    ),
  },
];

export function VisitSection() {
  return (
    <section
      className="visit-section"
      id="visit"
      aria-labelledby="visit-title"
    >
      <div>
        <Eyebrow className="text-cream/70">Opening soon</Eyebrow>
        <h2 id="visit-title" className="visit-title">
          A warm counter, a few seats, and a slower cup.
        </h2>
        <p className="mt-5 max-w-[620px] text-base leading-[1.7] text-cream/70">
          Weekend tastings first. Send a note and we will share the first brew
          dates before the doors open.
        </p>
      </div>
      <div className="visit-actions">
        <ButtonLink href="mailto:mohdmohnish01@gmail.com" className="cream-button">
          mohdmohnish01@gmail.com
        </ButtonLink>
        <div className="social-links" aria-label="Social links">
          {socials.map((social) => (
            <a
              key={social.label}
              className="social-link"
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={social.label}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    href: "https://www.facebook.com/coffeemasiha/",
    label: "Facebook",
    icon: (
      <path d="M14 8.6V6.9c0-.8.5-1 1.1-1H17V2.6A24.5 24.5 0 0 0 14.2 2c-2.8 0-4.7 1.7-4.7 4.8v1.8H6.4v3.7h3.1V22H14v-9.7h3.1l.5-3.7H14Z" />
    ),
  },
  {
    href: "https://x.com/coffeemasiha",
    label: "X",
    icon: (
      <path d="M17.7 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.3L5.4 21H2.3l7.3-8.3L2 3h6.4l4.4 5.8L17.7 3Zm-1.1 16.2h1.7L7.5 4.7H5.7l10.9 14.5Z" />
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
        <Eyebrow className="text-cream/70">Opening soon in Bengaluru</Eyebrow>
        <h2 id="visit-title" className="section-title max-w-[760px] text-cream">
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

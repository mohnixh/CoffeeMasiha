import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, className = "primary-button" }: ButtonLinkProps) {
  return <a className={className} href={href}>{children}</a>;
}

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id: string;
};

export function SectionHeading({ eyebrow, title, id }: SectionHeadingProps) {
  return (
    <div className="mb-8 grid gap-1">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="max-w-2xl text-[clamp(2.6rem,5vw,5.6rem)] leading-[0.94]">
        {title}
      </h2>
    </div>
  );
}

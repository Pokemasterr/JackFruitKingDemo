export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-line">
      <div className="container-page py-14 md:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">{intro}</p>
        ) : null}
      </div>
    </div>
  );
}

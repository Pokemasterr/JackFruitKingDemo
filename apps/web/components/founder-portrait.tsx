import Image from 'next/image';

/**
 * Founder portrait for the home page story block — Mithilesh Desai with a
 * jackfruit, cropped from the pack label artwork. The only photograph on the
 * site; products use placeholder tiles until real photography arrives.
 */
export function FounderPortrait() {
  return (
    <figure>
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-tile"
        style={{ backgroundColor: '#F3EBC4' }}
      >
        <Image
          src="/founder.jpg"
          alt="Mithilesh Desai holding a jackfruit"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-4 border-l border-line pl-4">
        <p className="font-serif text-lg italic leading-snug text-ink">
          “From my farm to your journey!”
        </p>
        <p className="mt-1 text-sm text-muted">Mithilesh Desai · the Jackfruit King</p>
      </figcaption>
    </figure>
  );
}

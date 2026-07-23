import { cn } from '@jk/ui';

/**
 * Muted, photography-shaped placeholder tile. Real product shots drop in later;
 * until then each product gets a calm, distinct swatch rather than a badly
 * cropped photo.
 */
export function ProductImage({
  tint,
  name,
  size,
  className,
}: {
  tint: string;
  name: string;
  size?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('relative aspect-square w-full overflow-hidden rounded-tile', className)}
      style={{ backgroundColor: tint }}
    >
      {/* soft top-light */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
      {/* the pack silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-[62%] w-[46%] flex-col items-center justify-end rounded-md bg-white/45 pb-3 ring-1 ring-ink/5 backdrop-blur-[1px]">
          <span className="font-serif text-lg leading-none text-forest-deep/80">JK</span>
          {size ? (
            <span className="mt-1 px-2 text-center font-sans text-[10px] font-medium uppercase tracking-label text-forest-deep/50">
              {size}
            </span>
          ) : null}
        </div>
      </div>
      <span className="absolute bottom-3 left-4 right-4 truncate font-serif text-sm text-ink/55">
        {name}
      </span>
    </div>
  );
}

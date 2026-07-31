export default function Marquee({ items, speed = 'normal', reverse = false, className = '', itemClassName = '' }) {
  const content = (
    <div className={'flex shrink-0 items-center gap-10 ' + (reverse ? 'animate-marqueeRev' : 'animate-marquee')}>
      {items.map((it, i) => (
        <span key={i} className={'shrink-0 ' + itemClassName}>{typeof it === 'string' ? it : it}</span>
      ))}
    </div>
  );
  return (
    <div className={'overflow-hidden mask-fade-x ' + className}>
      <div className="flex min-w-full">
        {content}
        {content}
      </div>
    </div>
  );
}

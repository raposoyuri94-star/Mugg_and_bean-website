export type IconName = 'arrow' | 'pin' | 'cup' | 'heart' | 'bake' | 'bean' | 'instagram' | 'star';

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={`icon ${className}`} aria-hidden="true"><use href={`#i-${name}`} /></svg>;
}

export function IconLibrary() {
  return (
    <svg className="icon-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></symbol>
        <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></symbol>
        <symbol id="i-cup" viewBox="0 0 32 32"><path d="M6 12h17v10a6 6 0 0 1-6 6h-5a6 6 0 0 1-6-6V12Zm17 1h2a4 4 0 0 1 0 8h-2M4 29h24M11 7c-3-3 3-3 0-6m6 6c-3-3 3-3 0-6" /></symbol>
        <symbol id="i-heart" viewBox="0 0 32 32"><path d="M16 28S3 20 3 11a7 7 0 0 1 13-4 7 7 0 0 1 13 4c0 9-13 17-13 17Z" /></symbol>
        <symbol id="i-bake" viewBox="0 0 32 32"><path d="m8 15 3 14h10l3-14M7 15c-5-6 2-12 7-9 3-6 11-4 12 2 6 2 4 9-2 8H8M15 20v5m4-5v5" /></symbol>
        <symbol id="i-bean" viewBox="0 0 32 32"><ellipse cx="16" cy="16" rx="10" ry="14" transform="rotate(40 16 16)" /><path d="M24 6C11 10 22 19 8 26" /></symbol>
        <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></symbol>
        <symbol id="i-star" viewBox="0 0 32 32"><path d="m16 1 3.2 10.5L29 7l-6.5 9L31 21l-11-.5L19 32l-5-10-9 7 4-11L0 14l11-2L9 2l7 7Z" fill="currentColor" stroke="none" /></symbol>
      </defs>
    </svg>
  );
}

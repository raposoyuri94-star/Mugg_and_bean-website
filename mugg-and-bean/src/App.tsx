import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent, MouseEvent } from 'react';
import { Icon, IconLibrary } from './Icons';
import { dishes, formatPrice, menuCategories, moments, store } from './content';
import type { Dish, MenuCategory, Moment } from './content';

type Detail = { type: 'dish'; dish: Dish } | { type: 'photo'; photo: Moment };

const assetBase = `${import.meta.env.BASE_URL}assets/`;

const navigation = [
  { id: 'home', label: 'Início' },
  { id: 'menu', label: 'A nossa ementa' },
  { id: 'story', label: 'A nossa história' },
  { id: 'moments', label: 'Bons momentos' },
] as const;

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className="brand" href="#home" aria-label={footer ? 'Voltar ao início' : 'Mugg & Bean — início'}>
      <img src={`${assetBase}logo.svg`} alt="Mugg & Bean" width="154" height="61" loading={footer ? 'lazy' : 'eager'} />
    </a>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1025px)');
    const handleResize = () => { if (media.matches) setMobileOpen(false); };
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    media.addEventListener('change', handleResize);
    document.addEventListener('keydown', handleEscape);
    return () => {
      media.removeEventListener('change', handleResize);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    navigation.forEach(item => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="announcement"><Icon name="bean" /><span>Bom café. Refeições generosas. Mais momentos juntos.</span></div>
      <header className="site-header" onClick={event => {
        if (event.target instanceof Element && event.target.closest('a[href^="#"]')) setMobileOpen(false);
      }}>
        <div className="nav-wrap container">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map(item => <a key={item.id} className={`nav-link ${active === item.id ? 'active' : ''}`} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>)}
          </nav>
          <a className="button button-small header-cta" href="#visit"><Icon name="pin" />Visite-nos no Baía Mall</a>
          <button ref={toggleRef} className="mobile-toggle" aria-label={mobileOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={mobileOpen} aria-controls="mobile-nav" onClick={() => setMobileOpen(!mobileOpen)}><span /><span /></button>
        </div>
        <nav className="mobile-nav" id="mobile-nav" aria-label="Navegação no telemóvel" hidden={!mobileOpen}>
          {navigation.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setMobileOpen(false)}>{item.label}</a>)}
          <a href="#visit" onClick={() => setMobileOpen(false)}>Visite-nos no Baía Mall</a>
        </nav>
      </header>
    </>
  );
}

function Hero() {
  return (
    <>
      <section className="hero container" id="home" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="hero-intro"><Icon name="star" />Há sempre espaço para mais.</p>
          <h1 id="hero-heading">Mais café.<br />Mais para si.</h1>
          <p className="hero-description">O seu café preferido. Uma refeição generosa.<br className="desktop-break" /> E tempo para saborear cada momento.<br className="desktop-break" /> Entre. Sinta-se em casa, no Baía Mall.</p>
          <div className="hero-actions"><a href="#menu" className="button">Explorar a ementa<Icon name="arrow" /></a><a href="#story" className="text-link">Conheça-nos<Icon name="arrow" /></a></div>
          <div className="hero-note"><svg aria-hidden="true" viewBox="0 0 57 34"><path d="M3 24c10 10 36 5 39-4 3-11-17-12-17-1 0 8 18 9 27-10m-9 1 9-3-1 9" /></svg><span>Um lugar familiar. Um pouco mais de carinho.</span></div>
        </div>
        <div className="hero-visual">
          <img className="hero-main-photo" src={`${assetBase}hero-table.webp`} alt="Uma chávena de cappuccino nas mãos de uma cliente à mesa do Mugg & Bean" width="556" height="650" fetchPriority="high" />
          <div className="since-stamp" aria-label="Um espírito generoso desde 1996"><span>Mais para si</span><Icon name="cup" /><span>Desde 1996</span></div>
          <div className="hero-photo-card"><img src={`${assetBase}brunch-table.jpg`} alt="Uma refeição generosa do Mugg & Bean, pronta a saborear" width="320" height="240" /><span>Há coisas boas à sua espera.<Icon name="heart" /></span></div>
          <Icon name="star" className="hero-spark" />
        </div>
      </section>
      <div className="hospitality-strip"><div className="container hospitality-inner">
        <span><Icon name="bean" />A nossa paixão pelo café</span>
        <span><Icon name="bake" />Do forno, com carinho</span>
        <span><Icon name="bake" />Generosidade em cada prato</span>
        <span><Icon name="cup" />A sua casa fora de casa</span>
      </div></div>
    </>
  );
}

function Menu({ onSelect }: { onSelect: (dish: Dish) => void }) {
  const [category, setCategory] = useState<MenuCategory>('favourites');
  const [announce, setAnnounce] = useState(false);
  const tabRefs = useRef(new Map<MenuCategory, HTMLButtonElement>());
  const items = dishes.filter(dish => category === 'favourites' ? dish.featured : dish.category === category);
  const categoryLabel = menuCategories.find(item => item.id === category)!.label;

  function selectCategory(next: MenuCategory) {
    setCategory(next);
    setAnnounce(true);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = (index + 1) % menuCategories.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + menuCategories.length) % menuCategories.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = menuCategories.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const id = menuCategories[next].id;
    selectCategory(id);
    tabRefs.current.get(id)?.focus();
  }

  return (
    <section className="menu-section container section-space" id="menu" aria-labelledby="menu-heading">
      <div className="section-intro"><p className="small-note">Para todos os gostos e vontades</p><h2 id="menu-heading">Os seus favoritos. E mais um pouco.</h2><p>Do primeiro gole à última garfada, há mais para saborear.</p></div>
      <div className="menu-tabs" role="tablist" aria-label="Categorias da ementa">
        {menuCategories.map((item, index) => <button key={item.id} ref={node => { if (node) tabRefs.current.set(item.id, node); else tabRefs.current.delete(item.id); }} role="tab" id={`tab-${item.id}`} aria-selected={category === item.id} aria-controls="menu-panel" tabIndex={category === item.id ? 0 : -1} data-category={item.id} onClick={() => selectCategory(item.id)} onKeyDown={event => handleTabKey(event, index)}>{item.label}</button>)}
      </div>
      <div className="menu-grid" id="menu-panel" role="tabpanel" aria-labelledby={`tab-${category}`} tabIndex={0}>
        {items.map(dish => <article className="menu-card" key={dish.id}>
          <button className="dish-image-button" data-dish={dish.id} aria-label={`Ver detalhes: ${dish.name}`} onClick={() => onSelect(dish)}>
            {dish.tag && <span className="dish-tag">{dish.tag}</span>}
            <img src={`${assetBase}${dish.image}`} alt={dish.name} width="400" height="400" loading="lazy" />
            <span className="dish-open"><Icon name="arrow" /></span>
          </button>
          <div className="dish-text"><h3><button className="dish-title" data-dish={dish.id} onClick={() => onSelect(dish)}>{dish.name}</button></h3><p>{dish.summary}</p><span className="dish-price">{formatPrice(dish.priceMzn)}</span></div>
        </article>)}
      </div>
      <p id="menu-status" className="sr-only" aria-live="polite">{announce ? `${items.length} sugestões na categoria ${categoryLabel}.` : ''}</p>
      <div className="menu-footer"><span>Confirme a disponibilidade e os preços na loja.</span><a className="text-link" href="#visit">Consultar a loja<Icon name="arrow" /></a></div>
    </section>
  );
}

function Story() {
  return (
    <section className="story-section" id="story" aria-labelledby="story-heading"><div className="container story-layout">
      <div className="story-photos"><img className="story-main" src={`${assetBase}friends.webp`} alt="Duas amigas a partilhar uma refeição e uma boa conversa no Mugg & Bean" width="620" height="560" loading="lazy" /><div className="story-caption"><Icon name="heart" /><span>Onde um café rápido<br />se transforma numa boa conversa.</span></div></div>
      <div className="story-copy"><p className="small-note">Mais do que uma cafetaria</p><h2 id="story-heading">Um lugar para<br />se sentir em casa.</h2><p>A nossa história começou na Cidade do Cabo, em 1996, com uma ideia simples: um bom café sabe ainda melhor com uma dose generosa de hospitalidade.</p><p>Hoje, esse espírito está em cada chávena, em cada refeição e em cada convite para ficar mais um pouco. No Baía Mall, em Maputo, há um lugar à sua espera.</p><a className="button button-outline" href="#visit">Venha conhecer-nos<Icon name="arrow" /></a></div>
    </div></section>
  );
}

function Moments({ onSelect }: { onSelect: (moment: Moment) => void }) {
  return (
    <section className="moments-section container section-space" id="moments" aria-labelledby="moments-heading">
      <div className="moments-heading"><div><p className="small-note">As coisas boas sabem melhor quando partilhadas</p><h2 id="moments-heading">A vida, um café de cada vez.</h2></div><a href={store.instagramUrl} className="text-link instagram-link" target="_blank" rel="noopener noreferrer"><Icon name="instagram" />@mugg_and_bean<Icon name="arrow" /></a></div>
      <div className="moments-grid">
        {moments.map(moment => <button className="moment" key={moment.image} data-photo={`${assetBase}${moment.image}`} data-caption={moment.caption} aria-label={`Ver fotografia: ${moment.label}`} onClick={() => onSelect(moment)}><img src={`${assetBase}${moment.image}`} alt={moment.alt} width="500" height="550" loading="lazy" /><span><Icon name="instagram" />{moment.label}</span></button>)}
      </div>
      <p className="gallery-note">Encontros, conversas e pequenas pausas para o café. Partilhe os seus momentos com <a href="https://www.instagram.com/explore/tags/mymuggtable/" target="_blank" rel="noopener noreferrer">#MyMuggTable</a>.</p>
    </section>
  );
}

function Visit() {
  const [origin, setOrigin] = useState('');
  const originRef = useRef<HTMLInputElement>(null);

  function handleDirections(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!origin.trim()) {
      originRef.current?.setCustomValidity('Indique o seu ponto de partida.');
      originRef.current?.reportValidity();
      return;
    }
    const url = new URL(store.directionsUrl);
    url.searchParams.set('origin', origin.trim());
    window.open(url.href, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="visit-section" id="visit" aria-labelledby="visit-heading"><div className="container visit-layout">
      <div className="visit-copy"><Icon name="cup" className="visit-cup" /><p className="small-note">Um bom encontro, mesmo aqui em Maputo</p><h2 id="visit-heading">O seu próximo café<br />é no Baía Mall.</h2><p>Venha fazer uma pausa connosco.<br />Nós tratamos do café.</p></div>
      <div className="finder"><h3>{store.name}</h3><address className="store-address">Baía Mall<br />{store.address}<br />{store.city}</address><a className="store-phone" href={store.phoneHref} aria-label={`Ligar para a loja: ${store.phone}`}>{store.phone}</a>
        <form id="location-form" action="https://www.google.com/maps/dir/" method="get" target="_blank" rel="noopener noreferrer" onSubmit={handleDirections}>
          <input type="hidden" name="api" value="1" /><input type="hidden" name="destination" value={store.mapQuery} />
          <label htmlFor="location">De onde vem?</label><div className="location-input"><Icon name="pin" /><input ref={originRef} id="location" name="origin" type="text" placeholder="O seu bairro ou ponto de partida" maxLength={120} autoComplete="street-address" value={origin} onChange={event => { setOrigin(event.target.value); event.target.setCustomValidity(''); }} onInvalid={event => event.currentTarget.setCustomValidity('Indique o seu ponto de partida.')} required /><button type="submit" aria-label="Traçar percurso até ao Baía Mall"><Icon name="arrow" /></button></div>
        </form>
        <a className="all-stores" href={store.mapUrl} target="_blank" rel="noopener noreferrer">Ver localização no Google Maps<Icon name="arrow" /></a>
        <div className="finder-locations"><span>Estamos à sua espera no Baía Mall, em Maputo.</span><a href={store.directionsUrl} target="_blank" rel="noopener noreferrer">Como chegar</a><a href={store.phoneHref}>Ligar para a loja</a></div>
      </div>
    </div></section>
  );
}

function Footer() {
  return (
    <footer className="site-footer container"><div className="footer-top"><Brand footer /><p>Um pouco mais de café.<br />Mais momentos de partilha.</p><nav aria-label="Navegação do rodapé"><a href="#menu">A nossa ementa</a><a href="#visit">Visite-nos no Baía Mall</a><a href={store.phoneHref}>Fale connosco</a></nav><a className="footer-instagram" href={store.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Mugg & Bean no Instagram"><Icon name="instagram" /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mugg & Bean. Conceito de website criado com carinho.</span><span>Mais e mais, desde 1996.</span><a href="#visit">Contactos e localização</a></div></footer>
  );
}

function DetailsModal({ detail, onClose }: { detail: Detail | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (detail && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      dialogRef.current.scrollTop = 0;
      document.body.classList.add('dialog-open');
      closeRef.current?.focus({ preventScroll: true });
    }
    return () => document.body.classList.remove('dialog-open');
  }, [detail]);

  function handleBackdrop(event: MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current;
    if (!dialog || event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }

  return (
    <dialog ref={dialogRef} id="detail-dialog" className="detail-dialog" aria-labelledby="dialog-title" onClose={onClose} onClick={handleBackdrop}>
      <button ref={closeRef} className="dialog-close" aria-label="Fechar detalhes" onClick={() => dialogRef.current?.close()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
      <div id="dialog-content">
        {detail?.type === 'dish' && <div className="dialog-dish"><img src={`${assetBase}${detail.dish.image}`} alt={detail.dish.name} width="400" height="500" /><div className="dialog-dish-copy"><h2 id="dialog-title">{detail.dish.name}</h2><p>{detail.dish.description}</p><p className="detail-price">{formatPrice(detail.dish.priceMzn)}</p><p className="detail-note">Confirme os preços, a disponibilidade e a informação sobre alergénios na loja do Baía Mall.</p><a className="button" href={store.phoneHref}>Consultar a loja<Icon name="arrow" /></a></div></div>}
        {detail?.type === 'photo' && <div className="dialog-photo"><img src={`${assetBase}${detail.photo.image}`} alt={detail.photo.alt} /><div className="dialog-photo-copy"><h2 id="dialog-title">Pequenos momentos, muito para saborear.</h2><p>{detail.photo.caption}</p><a className="text-link" href={store.instagramUrl} target="_blank" rel="noopener noreferrer">Mais momentos no Instagram<Icon name="arrow" /></a></div></div>}
      </div>
    </dialog>
  );
}

export default function App() {
  const [detail, setDetail] = useState<Detail | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  function openDetails(next: Detail) {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDetail(next);
  }

  function closeDetails() {
    document.body.classList.remove('dialog-open');
    setDetail(null);
    previousFocus.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <IconLibrary />
      <a className="skip-link" href="#main">Saltar para o conteúdo</a>
      <Header />
      <main id="main"><Hero /><Menu onSelect={dish => openDetails({ type: 'dish', dish })} /><Story /><Moments onSelect={photo => openDetails({ type: 'photo', photo })} /><Visit /></main>
      <Footer />
      <DetailsModal detail={detail} onClose={closeDetails} />
    </>
  );
}

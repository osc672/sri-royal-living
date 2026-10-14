import { useEffect, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X, Instagram, MapPin,
  Phone, Mail, Clock, Star, Quote, ChevronRight, ChevronLeft, ExternalLink,
  MessageCircle, CheckCircle2, LoaderCircle, MoveUpRight
} from 'lucide-react';
import { siteConfig, galleryItems, projects, reviews, instagramItems } from './config/siteConfig';

const navItems = [
  ['Home', 'home'], ['About', 'about'], ['Gallery', 'gallery'],
  ['Projects', 'projects'], ['Contact', 'contact']
];

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a href="#home" className="brand" aria-label={`${siteConfig.name} home`} onClick={() => setOpen(false)}>
      <span className="brand-mark">N<span>.</span></span>
      <span className="brand-name">{siteConfig.name}<small>DESIGN · CRAFT · CARE</small></span>
    </a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
      {open ? <X size={22}/> : <Menu size={22}/>}
    </button>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
      {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={16}/></a>
    </nav>
  </header>;
}

function FloatingContact() {
  const message = encodeURIComponent(`Hello ${siteConfig.name}, I'd like to know more about your services.`);
  return <div className="floating-contact" aria-label="Quick contact">
    <a className="float-phone" href={`tel:${siteConfig.phoneLink}`} aria-label="Call us"><Phone size={19}/></a>
    <a className="float-whatsapp" href={`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><MessageCircle size={20}/><span>Chat with us</span></a>
  </div>;
}

function Hero() {
  return <section className="hero section-wrap" id="home">
    <div className="hero-copy">
      <div className="eyebrow"><span className="eyebrow-line"/> GOOD WORK. GOOD PEOPLE.</div>
      <h1>Thoughtful work,<br/><em>made well.</em></h1>
      <p className="hero-lede">{siteConfig.description}</p>
      <div className="hero-actions">
        <a className="button button-dark" href="#contact">Tell us what you need <ArrowUpRight size={17}/></a>
        <a className="text-link" href="#projects">Explore our work <ArrowDownRight size={17}/></a>
      </div>
      <div className="hero-note"><span className="note-dot"/> Built around people, not just projects.</div>
    </div>
    <div className="hero-visual">
      <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=90" alt="Warm, thoughtfully designed living space" fetchPriority="high"/>
      <div className="image-caption"><span>01 / OUR APPROACH</span><span>Care in every detail</span></div>
      <div className="hero-stamp"><span>GOOD THINGS</span><strong>take shape</strong><span>WITH THE RIGHT PEOPLE</span></div>
    </div>
    <div className="hero-bottom"><span>INDEPENDENT · DETAIL-DRIVEN · PEOPLE-FIRST</span><a href="#about">Scroll to discover <ArrowDownRight size={15}/></a></div>
  </section>;
}

function SectionHeading({ kicker, title, text, number }) {
  return <div className="section-heading">
    <div><div className="eyebrow"><span className="eyebrow-line"/>{kicker}</div><h2>{title}</h2></div>
    <div className="section-heading-side">{number && <span className="section-number">{number}</span>}{text && <p>{text}</p>}</div>
  </div>;
}

function About() {
  return <section className="about-section section-wrap" id="about">
    <SectionHeading kicker="A LITTLE ABOUT US" title={<>Good work starts<br/>with <em>good listening.</em></>} number="01" text="The best results don't happen by accident. They come from asking the right questions, paying attention, and caring about the small things."/>
    <div className="about-grid">
      <div className="about-photo"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85" alt="Bright interior with natural textures" loading="lazy"/><span className="photo-tag">A thoughtful approach, every time.</span></div>
      <div className="about-story">
        <span className="story-index">A BETTER WAY TO GET IT DONE</span>
        <h3>Less fuss.<br/>More <em>thought.</em></h3>
        <p>We believe good work should feel straightforward. That means clear conversations, honest advice, and a process that makes sense from the first hello to the final detail.</p>
        <p>Every project is different, and we treat it that way. We take time to understand what matters to you, then bring the right mix of care, craft, and practical thinking to the table.</p>
        <a href="#contact" className="text-link">Get to know us <ArrowUpRight size={16}/></a>
      </div>
    </div>
    <div className="values-row">
      <div><span>01</span><strong>Listen first</strong><p>We start by understanding what matters to you.</p></div>
      <div><span>02</span><strong>Care about details</strong><p>The little things are usually what make the difference.</p></div>
      <div><span>03</span><strong>Keep it honest</strong><p>Clear expectations and straightforward communication.</p></div>
    </div>
  </section>;
}

function Gallery() {
  const [active, setActive] = useState(null);
  const move = (dir) => setActive((active + dir + galleryItems.length) % galleryItems.length);
  return <section className="gallery-section section-wrap" id="gallery">
    <SectionHeading kicker="A FEW THINGS WE'VE DONE" title={<>The details tell<br/><em>the story.</em></>} number="02" text="A collection of moments, finishes, and work we’re proud to put our name to. Replace these examples with your own project photography."/>
    <div className="gallery-grid">
      {galleryItems.map((item, i) => <button className={`gallery-item gallery-item-${i+1}`} key={item.title} onClick={() => setActive(i)} aria-label={`View image: ${item.title}`}>
        <img src={item.image} alt={item.alt} loading="lazy"/><span className="gallery-overlay"><span>{item.category}</span><strong>{item.title}</strong><span className="gallery-arrow"><ArrowUpRight size={19}/></span></span>
      </button>)}
    </div>
    <div className="gallery-foot"><span>GOOD WORK, CAPTURED ALONG THE WAY</span><a href="#projects" className="text-link">See selected projects <ArrowRight size={16}/></a></div>
    {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setActive(null)} onKeyDown={e => e.key === 'Escape' && setActive(null)}>
      <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close image viewer"><X/></button>
      <button className="lightbox-arrow lightbox-prev" onClick={e => {e.stopPropagation(); move(-1)}} aria-label="Previous image"><ChevronLeft/></button>
      <img src={galleryItems[active].image} alt={galleryItems[active].alt} onClick={e => e.stopPropagation()}/>
      <button className="lightbox-arrow lightbox-next" onClick={e => {e.stopPropagation(); move(1)}} aria-label="Next image"><ChevronRight/></button>
      <p>{galleryItems[active].title}</p>
    </div>}
  </section>;
}

function Projects() {
  return <section className="projects-section" id="projects"><div className="section-wrap">
    <SectionHeading kicker="SELECTED WORK" title={<>Made with purpose.<br/><em>Built to last.</em></>} number="03" text="Every project has its own story. Here are a few examples of the kind of care and thinking we bring to the work."/>
    <div className="project-list">{projects.map((p, i) => <article className="project-row" key={p.number}>
      <div className="project-number">{p.number}</div>
      <div className="project-image"><img src={p.image} alt={p.title} loading="lazy"/></div>
      <div className="project-info"><span className="project-type">{p.type} <span>·</span> {p.location}</span><h3>{p.title}</h3><p>{p.description}</p><a href="#contact" aria-label={`Ask us about ${p.title}`} className="round-arrow"><ArrowUpRight size={20}/></a></div>
    </article>)}</div>
    <div className="projects-bottom"><span>HAVE SOMETHING IN MIND?</span><a className="button button-outline" href="#contact">Let's make it happen <ArrowUpRight size={16}/></a></div>
  </div></section>;
}

function Reviews() {
  return <section className="reviews-section section-wrap" id="reviews">
    <div className="reviews-intro"><div className="eyebrow"><span className="eyebrow-line"/> KIND WORDS MATTER</div><h2>Trust is built<br/><em>one experience</em><br/>at a time.</h2><p>When customers share their experience, it helps others know what to expect. This section is ready for genuine reviews from your Google Business Profile.</p><a href={siteConfig.googleReviewsUrl} target="_blank" rel="noreferrer" className="text-link">Find us on Google <ArrowUpRight size={16}/></a></div>
    <div className="review-cards">{reviews.slice(0,2).map((r, i) => <article className="review-card" key={`${r.name}-${i}`}><Quote className="quote-mark" size={26}/><div className="stars" aria-label={`${r.rating} out of 5 stars`}>{Array.from({length:r.rating}, (_, j) => <Star key={j} size={14} fill="currentColor"/>)}</div><p>“{r.text}”</p><div className="review-person"><span className="avatar">{r.name.trim().charAt(0) || 'C'}</span><div><strong>{r.name}</strong><small>{r.date}</small></div><span className="google-g">G</span></div></article>)}
      <div className="review-note"><span className="note-dot"/><p>Demo placeholders are shown here. Replace them with real customer feedback before publishing.</p></div>
    </div>
  </section>;
}

function InstagramSection() {
  return <section className="social-section section-wrap">
    <div className="social-top"><div><div className="eyebrow"><span className="eyebrow-line"/> A LITTLE MORE OF US</div><h2>Follow along <em>@instagram</em></h2></div><a className="text-link" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Find us on Instagram <ArrowUpRight size={16}/></a></div>
    <div className="social-grid">{instagramItems.map((item, i) => <a className="social-tile" href={item.url} target="_blank" rel="noreferrer" key={item.title}><img src={item.image} alt={item.title} loading="lazy"/><span className="social-tile-icon"><Instagram size={18}/></span><span className="social-tile-caption">{item.title} <ArrowUpRight size={15}/></span></a>)}</div>
    <p className="social-disclaimer">Replace these sample images and links with your own Instagram posts or authorized embeds.</p>
  </section>;
}

function Contact() {
  const [form, setForm] = useState({name:'', email:'', phone:'', subject:'', message:''});
  const [status, setStatus] = useState({type:'idle', message:''});
  const update = e => setForm({...form, [e.target.name]: e.target.value});
  async function submit(e) {
    e.preventDefault(); setStatus({type:'loading', message:''});
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${base}/api/contact`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form)});
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'We could not send your message. Please try again.');
      setStatus({type:'success', message:data.message || 'Thanks for getting in touch.'});
      setForm({name:'', email:'', phone:'', subject:'', message:''});
    } catch (err) {
      setStatus({type:'error', message:err.message || 'Something went wrong. Please try again or contact us directly.'});
    }
  }
  return <section className="contact-section" id="contact"><div className="section-wrap">
    <SectionHeading kicker="LET'S START A CONVERSATION" title={<>Have a question?<br/><em>We're all ears.</em></>} number="04" text="Tell us a little about what you have in mind. We'll get back to you as soon as we can."/>
    <div className="contact-grid">
      <div className="contact-details"><span className="detail-kicker">THE PRACTICAL DETAILS</span>
        <a href={`tel:${siteConfig.phoneLink}`} className="contact-detail"><span className="detail-icon"><Phone size={18}/></span><span><small>Give us a call</small><strong>{siteConfig.phoneDisplay}</strong></span><ArrowUpRight size={17}/></a>
        <a href={`mailto:${siteConfig.email}`} className="contact-detail"><span className="detail-icon"><Mail size={18}/></span><span><small>Drop us an email</small><strong>{siteConfig.email}</strong></span><ArrowUpRight size={17}/></a>
        <div className="contact-detail"><span className="detail-icon"><MapPin size={18}/></span><span><small>Come say hello</small><strong>{siteConfig.address}</strong></span></div>
        <div className="contact-detail"><span className="detail-icon"><Clock size={18}/></span><span><small>When we're around</small><strong>{siteConfig.hours}</strong></span></div>
        <div className="map-frame"><iframe title="Map showing business location" src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapsQuery)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapsQuery)}`} target="_blank" rel="noreferrer" className="map-link">Get directions <ArrowUpRight size={14}/></a></div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <div className="form-heading"><h3>Send us a message</h3><p>Fields marked with * are required.</p></div>
        <div className="form-row"><label>Full name *<input name="name" value={form.name} onChange={update} required minLength="2" maxLength="100" autoComplete="name" placeholder="Your name"/></label><label>Email address *<input name="email" type="email" value={form.email} onChange={update} required maxLength="254" autoComplete="email" placeholder="you@example.com"/></label></div>
        <div className="form-row"><label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} maxLength="30" autoComplete="tel" placeholder="Optional"/></label><label>What is this about?<select name="subject" value={form.subject} onChange={update}><option value="">Choose a topic</option><option>General enquiry</option><option>Project discussion</option><option>Service information</option><option>Other</option></select></label></div>
        <label>Your message *<textarea name="message" value={form.message} onChange={update} required minLength="10" maxLength="3000" rows="5" placeholder="Tell us a little about what you need…"/></label>
        <div className="form-submit-row"><button className="button button-dark" type="submit" disabled={status.type === 'loading'}>{status.type === 'loading' ? <>Sending <LoaderCircle className="spin" size={16}/></> : <>Send your message <ArrowUpRight size={16}/></>}</button><span>We’ll only use your details to reply.</span></div>
        {status.type !== 'idle' && status.type !== 'loading' && <div className={`form-status ${status.type}`} role="status">{status.type === 'success' ? <CheckCircle2 size={18}/> : <X size={18}/>}<span>{status.message}</span></div>}
      </form>
    </div>
  </div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="section-wrap">
    <div className="footer-main">
      <div className="footer-brand-col"><a href="#home" className="brand footer-brand"><span className="brand-mark">N<span>.</span></span><span className="brand-name">{siteConfig.name}<small>DESIGN · CRAFT · CARE</small></span></a><p>Good people. Thoughtful work.<br/>A little care in everything we do.</p><a href="#contact" className="footer-talk">Have a project in mind? <ArrowUpRight size={16}/></a></div>
      <div className="footer-col"><span className="footer-label">TAKE A LOOK</span>{navItems.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
      <div className="footer-col"><span className="footer-label">SAY HELLO</span><a href={`tel:${siteConfig.phoneLink}`}>{siteConfig.phoneDisplay}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><span>{siteConfig.address}</span><span>{siteConfig.hours}</span></div>
      <div className="footer-col"><span className="footer-label">AROUND THE WEB</span><a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13}/></a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13}/></a><a href={siteConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Google reviews <ArrowUpRight size={13}/></a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span><a href="#home">Back to the top <ArrowUpRight size={14}/></a><span className="footer-made">MADE WITH CARE <span>✳</span></span></div>
  </div></footer>;
}

function useReactBitsMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll(
      '.section-heading, .hero-copy, .hero-visual, .about-grid, .values-row > div, .gallery-item, .gallery-foot, .project-row, .projects-bottom, .reviews-intro, .review-card, .review-note, .social-top, .social-tile, .contact-details, .contact-form, .footer-main'
    );
    targets.forEach((node, index) => {
      node.classList.add('rb-reveal');
      node.style.setProperty('--rb-delay', `${Math.min(index % 4, 3) * 90}ms`);
    });
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(node => node.classList.add('rb-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rb-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    targets.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useReactBitsMotion();
  return <div className="rb-app-shell"><div className="ambient-orb ambient-orb-one" aria-hidden="true"/><div className="ambient-orb ambient-orb-two" aria-hidden="true"/><Header/><main><Hero/><About/><Gallery/><Projects/><Reviews/><InstagramSection/><Contact/></main><Footer/><FloatingContact/><a className="back-to-top" href="#home" aria-label="Back to top"><ArrowUpRight size={18}/></a></div>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { WrapStudio } from "@/components/site/AutomotiveMotion";
import ShopEntrance from "@/components/site/ShopEntrance";
import Reveal from "@/components/motion/Reveal";
import { customizationMenu, detailingMenu, repairMenu, type ServiceMenu } from "@/lib/repair-menu";
import styles from "./repair-home.module.css";

const title = "Auto Repair & Customization";
const description = "Explore Diamond Auto Sales service pricing for maintenance, brakes, diagnostics, tire service, tint, wraps, bodywork and detailing in Raleigh, NC.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["auto repair Raleigh", "vehicle customization Raleigh", "Diamond Auto Sales"],
  openGraph: { title: `${title} | Diamond Auto Sales`, description, type: "website", siteName: "Diamond Auto Sales" },
};

function inquiry(service: string) {
  const subject = `Service inquiry — ${service}`;
  return `mailto:hello@diamondautonc.com?subject=${encodeURIComponent(subject)}`;
}

function PriceCards({ menu, customize = false }: { menu: ServiceMenu[]; customize?: boolean }) {
  return (
    <div className={styles.grid}>
      {menu.map(({ id, title, items, note }) => (
        <article id={id} className={styles.card} key={id}>
          <h3>{title}</h3>
          <dl className="mt-4 text-base">
            {items.map(([name, price]) => (
              <div className={styles.line} key={name}>
                <dt>{name}</dt>
                <dd>{price}</dd>
              </div>
            ))}
          </dl>
          {note && <p className="mt-2 text-sm opacity-85">{note}</p>}
          <a
            href={inquiry(title)}
            aria-label={`${customize ? "Get a quote" : "Book service"} for ${title} by email`}
            className={`pill mt-5 ${customize ? "pill-dark" : "pill-light"}`}
          >
            {customize ? "Get a Quote" : "Book Service"}
          </a>
        </article>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ShopEntrance>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Diamond Auto Sales · Raleigh, NC</p>
          <h1 id="repair-title" className={styles.headline}>Auto repair <span>&amp; customization.</span></h1>
          <p className={styles.subtitle}>Maintenance, diagnostics, and custom finishes in Raleigh.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#services" className="pill pill-blue">Explore Services</Link>
            <Link href="#customization" className="pill pill-dark">Try a Wrap Color</Link>
          </div>
        </div>
      </ShopEntrance>

      <nav aria-label="Explore the shop" className={styles.bayNav}>
        <div>
          <Link href="#services"><strong>Repair & Maintenance</strong><span>Oil changes, brakes, tires, diagnostics</span></Link>
          <Link href="#customization"><strong>Customization</strong><span>Tint, wraps, body & paint</span></Link>
          <Link href="#detailing"><strong>Detailing</strong><span>Basic Wash, Deluxe, Premium</span></Link>
        </div>
      </nav>

      <section id="services" className={styles.section} aria-labelledby="services-title">
        <div className={styles.inner}>
          <Reveal>
            <h2 id="services-title" className={styles.title}>Repair & Maintenance</h2>
            <p className={styles.subtitle}>Compare prices for routine maintenance, diagnostics, and repairs.</p>
          </Reveal>
          <PriceCards menu={repairMenu} />
        </div>
      </section>

      <section id="customization" className={`${styles.section} ${styles.dark}`} aria-labelledby="custom-title">
        <div className={styles.inner}>
          <div className={styles.customIntro}>
            <Reveal>
              <p className={styles.eyebrow}>Customization</p>
              <h2 id="custom-title" className={`mt-2 ${styles.title}`}>Make it yours.</h2>
              <p className={styles.subtitle}>Pick a finish to watch the wrap sweep across the car.</p>
            </Reveal>
            <WrapStudio />
          </div>
          <PriceCards menu={customizationMenu} customize />
        </div>
      </section>

      <section id="detailing" className={styles.section} aria-labelledby="detail-title">
        <div className={styles.inner}>
          <Reveal>
            <h2 id="detail-title" className={styles.title}>Detailing</h2>
            <p className={styles.subtitle}>Three packages, from a hand wash to a deep interior clean.</p>
          </Reveal>
          <div className={`${styles.grid} ${styles.packages}`}>
            {detailingMenu.map(({ name, price, items }) => (
              <article className={styles.card} key={name}>
                <h3>{name}</h3>
                <p className={`mt-2 text-xl ${styles.price}`}>{price}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a className="pill pill-light mt-6" href={inquiry(`Detailing — ${name}`)} aria-label={`Book ${name} detailing by email`}>
                  Book Service
                </a>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={inquiry("Service appointment")} className="pill pill-blue">Request Service by Email</a>
            <Link href="/contact" className="pill pill-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

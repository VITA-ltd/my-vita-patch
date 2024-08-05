import { NavLink } from "@remix-run/react";

export function Intro() {
  return (
    <section className="home-intro">
      <div className="home-intro-banner">
        <div className="home-intro-banner-gradient" />
        <img src="/intro.png" />
      </div>
      <div className="home-intro-description">
        <h2>
          Beat Hangovers,<br />
          Before They Begin.
        </h2>
        <p>What if you could party all night without the morning-after fog?</p>
        <p>Apply a VITA® Patch before heading out, and let our signature blend keep you energized and clear-headed.</p>
        <p>Infused with Milk Thistle extract, VITA® helps reduce inflammation and supports liver health. Wake up refreshed, balanced, and ready to seize the day. With a single patch, every night is unforgettable, and every morning is under your control.</p>
      </div>
    </section>
  );
}

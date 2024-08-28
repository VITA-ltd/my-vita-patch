import { NavLink } from "@remix-run/react";

export function Ingredients() {
  return (
    <section className="home-ingredients">
      <div className="ingredients-description">
        <h2>
          <strong>Formulated to Heal.</strong><br />
          A Synergy of Nature’s Best*
        </h2>
        <p>
          Discover how we developed a transdermal formulation<br/>
          for your drinking, without the need for any synthetics.<br/>
          <br/>
          With products like <strong>Acai Berry</strong>, <strong>Ashwagandha</strong>, <strong>Turmeric</strong>,<br/>
          and <strong>Milk Thistle</strong>, all recognized for their powerful<br/>
          antioxidant and anti-inflammatory properties.
        </p>
      </div>

      <div className="ingredients-showcase">
        <div className="ingredients-gradient" />
        <div className="ingredients-gradient-hover" />

        <div className="ingredients-backgound">
          <img src="/ingredients 1.jpeg" />
          <img src="/ingredients 2.jpeg" />
          <img src="/ingredients 3.jpeg" />
          <img src="/ingredients 4.jpeg" />
        </div>

        <span className="ingredients-button">
          Discover our Ingredients
        </span>
      </div>
    </section>
  );
}

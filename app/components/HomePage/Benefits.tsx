import { NavLink } from "@remix-run/react";

export function Benefits() {
  return (
    <section className="home-benefits">
      <div className="benefits-header">
        <img src="/benefits.jpeg" />
        <div className="benefits-gradient" />

        <h1>
          How does VITA help <br />prevent hangovers?
        </h1>
        <p>
          Glutathione: The master antioxidant fighting toxins <br />and sustaining your alcohol consumption.
        </p>
      </div>

      <div className="benefits-descriptions">
        <div>
          <div className="benefits-logo" style={{ mask: `url(/benefits1.svg)` }} />
          <h3>MASTER ANTIOXODIANT</h3>
          <p>
            Helps to neutralize harmful free radicals<br />
            and toxins to protect your cells.<br />
            It’s your body’s ultimate defense.
          </p>
        </div>

        <div>
          <div className="benefits-logo" style={{ mask: `url(/benefits2.svg)` }} />
          <h3>SUPPORTS LIVER</h3>
          <p>
            Accelerates liver detoxification,<br />
            reducing your hangover symptoms.
          </p>
        </div>

        <div>
          <div className="benefits-logo" style={{ mask: `url(/benefits3.svg)` }} />
          <h3>BOOSTS IMMUNE FUNCTION</h3>
          <p>
            Fortifies your immune system,<br />
            helping you bounce back<br />
            as quick as possible.
          </p>
        </div>

        <div>
          <div className="benefits-logo" style={{ mask: `url(/benefits4.svg)` }} />
          <h3>RESTORES ENERGY</h3>
          <p>
            Packs in a signature blend
          </p>
        </div>
      </div>
    </section>
  );
}

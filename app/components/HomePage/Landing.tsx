import { NavLink } from "@remix-run/react";

export function Landing() {
  return (
    <header className="home-landing">
      <div className="home-landing-content">
        <span className="new-formula">New Formula</span>
        <h1>
          The<br />
          After-Party<br />
          Patch.
        </h1>
        <p>
          The VITA® After-Party Patch<br />
          Our signature remedy.<br />
          Bringing the life back to your night.
        </p>
        <NavLink
          end
          prefetch="intent"
          to="/collections/all"
        >
          Shop Now
        </NavLink>
      </div>
      <img src="/homeLanding2.webp" />
    </header>
  );
}

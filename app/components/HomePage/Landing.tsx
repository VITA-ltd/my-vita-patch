import { NavLink } from "@remix-run/react";
import { CustomerTestimonials } from "./CustomerTestimonials";
import { useEffect, useState } from "react";

export function Landing() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 465) {
      setIsMobile(true)
    }
  })

  return (
    <header className="home-landing">
      <div className="home-landing-content">
        <video autoPlay muted loop playsInline>
          <source src="/homeBackground.mp4" type="video/mp4" />
        </video>

        <span className="new-formula">New Formula</span>
        <h1>
          The <br />After-Party <br />Patch.
        </h1>
        <p>
          The VITA® After-Party Patch<br />
          Our signature remedy.<br />
          Bringing the life back to your night.
        </p>
        <NavLink
          end
          prefetch="intent"
          to="/products/after-party"
        >
          Shop Now
        </NavLink>
        {isMobile &&
          <CustomerTestimonials />
        }
      </div>
      <img src="/homeLanding2.webp" />

      <div className="mobileHeader">
        <img src="/home/mobileHeader.webp" />
        <span className="new-formula">Now Available</span>
        <h1>
          The After-Party Patch.
        </h1>
      </div>
    </header>
  );
}

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
        <span className="new-formula">{isMobile ? "Now Available" : "New Formula"}</span>
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
      <img src={isMobile ? "/home/mobileHeader.webp" : "/homeLanding2.webp"} />
    </header>
  );
}

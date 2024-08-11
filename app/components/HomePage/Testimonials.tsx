import { Marquee } from "@gfazioli/mantine-marquee";
import { Await } from "@remix-run/react";
import { Suspense } from "react";

export function Testimonials() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={null}>
        <Marquee className="home-testimonials" w={480} duration={45}>
          <div className="home-testimonial">
            <img src="/test.svg" />
            <span>There’s no way that anyone wouldn’t benefit from this.</span>
          </div>
          <div className="home-testimonial">
            <img src="/test.svg" />
            <span>Sample Testimonial 2</span>
          </div>
          <div className="home-testimonial">
            <img src="/test.svg" />
            <span>There’s no way that anyone wouldn’t benefit from this.</span>
          </div>
          <div className="home-testimonial">
            <img src="/test.svg" />
            <span>Sample Testimonial 3</span>
          </div>
          <div className="home-testimonial">
            <img src="/test.svg" />
            <span>There’s no way that anyone wouldn’t benefit from this.</span>
          </div>
          <div className="home-testimonial">
            <img src="/test.svg" />
            <span>Sample Testimonial 4</span>
          </div>
          <div className="home-testimonial">
            <img src="/test.svg" />
            <span>There’s no way that anyone wouldn’t benefit from this.</span>
          </div>
          <div className="home-testimonial">
            <img src="/test.svg" />
            <span>Sample Testimonial 5</span>
          </div>
        </Marquee>
      </Await>
    </Suspense>
  );
}

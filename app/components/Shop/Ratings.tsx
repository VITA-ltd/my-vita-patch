import { NavLink } from "@remix-run/react";

export function Ratings() {
  return (
    <section className="shop-ratings">
      <div className="title">
        <h2>DON’T JUST TAKE OUR WORD...</h2>
        <h1>
          Here’s What VITA<br />
          Users are Saying
        </h1>
        <img src="/shop/arrow.svg" />
      </div>

      <div className="rating">
        <img src="/shop/example1.jpeg" />
        <img src="/stars.svg" className="stars" />
        <p>"I felt more hydrated and didn’t struggle to get moving."</p>
        <div className="customer-name">
          <strong>TARA S.</strong>
          <img src="/checkCircle.svg" />
        </div>
      </div>

      <div className="rating">
        <img src="/shop/example2.jpeg" />
        <img src="/stars.svg" className="stars" />
        <p>“I noticed I didn’t feel as drained by the end of the night.”</p>
        <div className="customer-name">
          <strong>CESARE E.</strong>
          <img src="/checkCircle.svg" />
        </div>
      </div>

      <div className="rating">
        <img src="/shop/example2.jpeg" />
        <img src="/stars.svg" className="stars" />
        <p>"I immediately noticed I had no nausea after last night. I just felt ready to start my day."</p>
        <div className="customer-name">
          <strong>ELIZA C.</strong>
          <img src="/checkCircle.svg" />
        </div>
      </div>

      <div className="rating">
        <img src="/shop/example2.jpeg" />
        <img src="/stars.svg" className="stars" />
        <p>“I always woke up with brain fog until I started using VITA every time I had to prepare for my set."</p>
        <div className="customer-name">
          <strong>HANNA N.</strong>
          <img src="/checkCircle.svg" />
        </div>
      </div>
    </section>
  );
}

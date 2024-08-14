import { NavLink } from "@remix-run/react";

export function Ingredients() {
  return (
    <section className="home-ingredients">
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
    </section>
  );
}

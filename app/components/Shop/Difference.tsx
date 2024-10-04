import { NavLink } from "@remix-run/react";

export function Difference() {
  return (
    <section className="shop-difference">
      <span className="title">THE VITA® DIFFERENCE</span>

      <div className="data">
        <div>
          <h2>92%</h2>
          <p>
            of members experienced<br /> reduced hangover symptoms<br /> with just one patch.
          </p>
        </div>

        <div>
          <h2>85%</h2>
          <p>
            of members would recommend<br /> VITA® to a friend.
          </p>
        </div>

        <div>
          <h2>78%</h2>
          <p>
            of members saw improved<br /> cognitive function by mid-<br /> morning after using VITA®.
          </p>
        </div>
      </div>

      <span>*Based on a survey including n=63 current VITA® members evaluating self-perceived efficacy.</span>
    </section>
  );
}

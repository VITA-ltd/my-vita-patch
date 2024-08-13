import { NavLink } from "@remix-run/react";

export function Gallery() {
  return (
    <section className="home-gallery">
      <div className="home-gallery-top">
        <span>Join The Movement</span>
        <a>View Full Gallery</a>
      </div>
      <h3 className="home-gallery-hashtag">#VITApatch</h3>
      <div className="home-image-gallery-top">
        <img src="/gallery 1.jpeg" />
        <img src="/gallery 2.jpeg" />
      </div>
      <div className="home-image-gallery-bottom">
        <img src="/gallery 3.jpeg" />
        <img src="/gallery 4.jpeg" />
        <img src="/gallery 5.jpeg" />
      </div>
      <button className="home-gallery-upload-button">Upload Yours</button>
    </section>
  );
}

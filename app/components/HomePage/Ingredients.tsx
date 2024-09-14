import { NavLink } from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

export function Ingredients() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 430) {
      setIsMobile(true)
    }
  })

  return (
    <section className="home-ingredients">
      <div className="ingredients-description">
        <h2>
          <strong>Formulated to Heal.</strong><br />
          A Synergy of Nature’s Best.*
        </h2>
        {isMobile ?
          <>
            <p>Discover how we developed a transdermal formulation for your drinking, without the need for any synthetics.</p>
            <p>With products like:</p>
          </>
          :
          <p>
            Discover how we developed a transdermal formulation<br />
            for your drinking, without the need for any synthetics.<br />
            <br />
            With products like <strong>Acai Berry</strong>, <strong>Ashwagandha</strong>, <strong>Turmeric</strong>,<br />
            and <strong>Milk Thistle</strong>, all recognized for their powerful<br />
            antioxidant and anti-inflammatory properties.
          </p>
        }
      </div>


      {isMobile ?
        <>
          <Swiper
            className="ingredients-carousel"
            loop={true}
            slidesPerView={3}
            centeredSlides
          >
            <SwiperSlide>
              <strong className="ingredient-label">Turmeric</strong>
              <div className="ingredient-gradient" />
              <img className="ingredient-img" src="/ingredients 1.jpeg" />
            </SwiperSlide>
            <SwiperSlide>
              <strong className="ingredient-label">Acai Berry</strong>
              <div className="ingredient-gradient" />
              <img className="ingredient-img" src="/ingredients 2.jpeg" />
            </SwiperSlide>
            <SwiperSlide>
              <strong className="ingredient-label">Ashwagandha</strong>
              <div className="ingredient-gradient" />
              <img className="ingredient-img" src="/ingredients 3.jpeg" />
            </SwiperSlide>
            <SwiperSlide>
              <strong className="ingredient-label">Milk Thistle</strong>
              <div className="ingredient-gradient" />
              <img className="ingredient-img" src="/ingredients 4.jpeg" />
            </SwiperSlide>
          </Swiper>
          <div className="mobile-discover">
            <p>All recognized for their powerful antioxidant and anti-inflammatory properties.</p>
            <a>Discover Our Ingredients</a>
          </div>
        </>
        :
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
      }
    </section>
  );
}

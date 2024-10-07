import { NavLink } from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export function CustomerTestimonials() {
  return (
    <section className="home-customer-testimonials">
      <div className="customer-testimonial-stars">
        <img src="/stars.svg" />
        <span>1000+ 5-star reviews</span>
      </div>

      <Swiper
        className="customer-testimonial-carousel"
        modules={[Autoplay]}
        loop={true}
        direction="vertical"
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true
        }}
      >
        <SwiperSlide className="customer-testimonial">
          <p>“The VITA Patch genuinely made me feel like I didn't even go out yesterday.”</p>
          <span>Maya Desai, Canada</span>
        </SwiperSlide>
        <SwiperSlide className="customer-testimonial">
          <p>“The patch is a lifesaver; I put it on before heading out, and the next morning, I felt like I had my life together again.”</p>
          <span>Eli Vance, Spain</span>
        </SwiperSlide>
        <SwiperSlide className="customer-testimonial">
          <p>“I honestly didn’t think a patch could make this much difference. I felt like myself again after a busy night out—no sluggishness, just good vibes.”</p>
          <span>Dustin Lee, USA</span>
        </SwiperSlide>
        <SwiperSlide className="customer-testimonial">
          <p>“After using the Vita  patch, I felt like I could actually live my weekend instead of just recovering.”</p>
          <span>Asher Cohen, USA</span>
        </SwiperSlide>
        <SwiperSlide className="customer-testimonial">
          <p>“After a long night at a concert, VITA surprised me. I felt awake enough to explore the city instead of crashing.”</p>
          <span>Malik Richards, Canada</span>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

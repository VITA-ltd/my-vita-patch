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
          <p>“Its greatest benefit is how it keeps my mind clear and focused on the task at hand. 1”</p>
          <span>Bryce Bennett, USA</span>
        </SwiperSlide>
        <SwiperSlide className="customer-testimonial">
          <p>“Its greatest benefit is how it keeps my mind clear and focused on the task at hand. 2”</p>
          <span>Bryce Bennett, USA</span>
        </SwiperSlide>
        <SwiperSlide className="customer-testimonial">
          <p>“Its greatest benefit is how it keeps my mind clear and focused on the task at hand. 3”</p>
          <span>Bryce Bennett, USA</span>
        </SwiperSlide>
        <SwiperSlide className="customer-testimonial">
          <p>“Its greatest benefit is how it keeps my mind clear and focused on the task at hand. 4”</p>
          <span>Bryce Bennett, USA</span>
        </SwiperSlide>
        <SwiperSlide className="customer-testimonial">
          <p>“Its greatest benefit is how it keeps my mind clear and focused on the task at hand. 5”</p>
          <span>Bryce Bennett, USA</span>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

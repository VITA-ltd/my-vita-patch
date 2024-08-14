import { NavLink } from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export function CustomerTestimonials() {
  return (
    <section className="home-customer-testimonials">
      <div className="customer-testimonial-stars">
        <svg width="362" height="21" viewBox="0 0 362 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0.5L12.9977 6.37401L19.5106 7.40983L14.8504 12.076L15.8779 18.5902L10 15.6L4.12215 18.5902L5.14961 12.076L0.489435 7.40983L7.0023 6.37401L10 0.5Z" fill="#42FFAF" />
          <path d="M33.5 0.5L36.6476 6.37401L43.4861 7.40983L38.5929 12.076L39.6717 18.5902L33.5 15.6L27.3283 18.5902L28.4071 12.076L23.5139 7.40983L30.3524 6.37401L33.5 0.5Z" fill="#42FFAF" />
          <path d="M57 0.5L59.9977 6.37401L66.5106 7.40983L61.8504 12.076L62.8779 18.5902L57 15.6L51.1221 18.5902L52.1496 12.076L47.4894 7.40983L54.0023 6.37401L57 0.5Z" fill="#42FFAF" />
          <path d="M80.5 0.5L83.6476 6.37401L90.4861 7.40983L85.5929 12.076L86.6717 18.5902L80.5 15.6L74.3283 18.5902L75.4071 12.076L70.5139 7.40983L77.3524 6.37401L80.5 0.5Z" fill="#42FFAF" />
          <path d="M104.5 0.5L107.648 6.37401L114.486 7.40983L109.593 12.076L110.672 18.5902L104.5 15.6L98.3283 18.5902L99.4071 12.076L94.5139 7.40983L101.352 6.37401L104.5 0.5Z" fill="#42FFAF" />
        </svg>
        <span>1000+ 5-star reviews</span>
      </div>

      <Swiper
        className="customer-testimonial-carousel"
        modules={[Autoplay]}
        loop={true}
        direction="vertical"
        autoplay={{
          delay: 2500
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

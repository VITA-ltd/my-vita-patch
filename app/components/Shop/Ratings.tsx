import { NavLink, useLoaderData } from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { loader } from "~/routes/($locale).products.$handle";

export function Ratings() {
  const data = useLoaderData<typeof loader>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 430) {
      setIsMobile(true)
    }
  })

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

      {isMobile ?
        <>
          <Swiper
            loop={true}
            slidesPerView={3}
            centeredSlides
          >
            {
              data.shopTestimonials.metaobjects.nodes.map((testimonial) => {
                let imageUrl = "";
                let quote = "";
                let customerName = "";

                testimonial.fields.map((field) => {
                  switch (field.key) {
                    case 'image':
                      imageUrl = field.reference.image.url;
                      break;
                    case 'quote':
                      quote = field.value;
                      break;
                    case 'customer_name':
                      customerName = field.value;
                      break;
                  }
                })

                return (
                  <SwiperSlide>
                    <div className="rating">
                      <img src={imageUrl} />
                      <img src="/stars.svg" className="stars" />
                      <p>“{quote}”</p>
                      <div className="customer-name">
                        <strong>{customerName}</strong>
                        <img src="/checkCircle.svg" />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </>
        :
        <div className="cutomer-ratings">
          {
            data.shopTestimonials.metaobjects.nodes.map((testimonial) => {
              let imageUrl = "";
              let quote = "";
              let customerName = "";

              testimonial.fields.map((field) => {
                switch (field.key) {
                  case 'image':
                    imageUrl = field.reference.image.url;
                    break;
                  case 'quote':
                    quote = field.value;
                    break;
                  case 'customer_name':
                    customerName = field.value;
                    break;
                }
              })

              return (
                <div className="rating">
                  <img src={imageUrl} />
                  <img src="/stars.svg" className="stars" />
                  <p>“{quote}”</p>
                  <div className="customer-name">
                    <strong>{customerName}</strong>
                    <img src="/checkCircle.svg" />
                  </div>
                </div>
              )
            })
          }
        </div>
      }
      <a className="mobile-read-button">Read more reviews </a>
    </section>
  );
}

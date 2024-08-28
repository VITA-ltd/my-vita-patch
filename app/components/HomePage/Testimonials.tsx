import { Marquee } from "@gfazioli/mantine-marquee";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { loader } from "~/routes/($locale)._index";

export function Testimonials() {
  const data = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.testimonials}>
        {(response) => {
          return (
            <Marquee className="home-testimonials" w={480} duration={45}>
              {
                response.metaobjects.nodes.map((testimonial, i: number) => {
                  return (
                    <div className="home-testimonial" key={i}>
                      {testimonial.fields.map((field, i: number) => {
                        if (field.key === 'logo' && field.reference) {
                          return <img src={field.reference.image.url} key={i} />
                        } else if (field.key === 'quote') {
                          return <span key={i}>{field.value}</span>
                        }
                      })}
                    </div>
                  )
                })
              }
            </Marquee>
          )
        }}
      </Await>
    </Suspense>
  );
}
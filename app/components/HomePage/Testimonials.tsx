import { Marquee } from "@gfazioli/mantine-marquee";
import { Await, useLoaderData } from "@remix-run/react";
import { defer, LoaderFunctionArgs } from "@remix-run/server-runtime";
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
                response.metaobjects.nodes.map((testimonial: any) => {
                  return <div className="home-testimonial">
                    {testimonial.fields.map((field: any) => {
                      if (field.key === 'logo') {
                        return <img src={field.reference.image.url} />
                      } else if (field.key === 'quote') {
                        return <span>{field.value}</span>
                      }
                    })}
                  </div>
                })
              }
            </Marquee>
          )
        }}
      </Await>
    </Suspense>
  );
}
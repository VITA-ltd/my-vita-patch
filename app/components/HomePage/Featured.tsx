import { Await, NavLink, useLoaderData } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { Suspense } from "react";
import { loader } from "~/routes/($locale)._index";

export function Featured() {
  const data = useLoaderData<typeof loader>();

  return (<section className="home-featured">
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.featuredProducts}>
        {(response) => {
          const featuredProduct = response.collection.products.nodes[0];

          return <>
            <div className="featured-info">
              <h1>
                Get started with your<br />
                {featuredProduct.title} Patch <img src="/featuredHashtag.svg" /><img src="/featuredSmile.svg" />
              </h1>
              <div className="details">
                <strong>{featuredProduct.title}</strong>
                <span>
                  <Money data={featuredProduct.priceRange.minVariantPrice} />
                  {!featuredProduct.compareAtPriceRange.minVariantPrice.amount.startsWith("0") &&
                    <Money className='default-price' data={featuredProduct.compareAtPriceRange.minVariantPrice} />
                  }
                </span>

                <span>60-day Money Back Guarantee</span>
              </div>
            </div>
            <Image
              // @ts-ignore
              data={featuredProduct.featuredImage}
              aspectRatio="1/1"
            />
          </>
        }}
      </Await>
    </Suspense>
  </section>
  );
}

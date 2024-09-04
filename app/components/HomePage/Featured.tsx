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
                {featuredProduct.title} Patch<img src="/featuredHashtag.svg" /><img src="/featuredSmile.svg" />
              </h1>
              <div className="details">
                <div className="main-details">
                  <strong>The {featuredProduct.title} Patch <Money data={featuredProduct.priceRange.minVariantPrice} /></strong>
                  <div className="patch-details">
                    <strong>24 patches</strong>
                    <strong>$0.50/patch</strong>
                  </div>
                  <p>Hangover relief with a nutrient boost, in a simple patch.</p>
                </div>

                <button>Add to Cart</button>

                <div className="order-gurantees">
                  <span><img src="/checkCircle.svg" />60-day money back guarantee</span>
                  <span><img src="/checkCircle.svg" />Update or Cancel Anythime</span>
                </div>
              </div>
              <div className="featured-benefits">
                <img src="/home/benefitsSustainable.svg" />
                <img src="/home/benefitsPesticide.svg" />
                <img src="/home/benefitsAntioxidant.svg" />
                <img src="/home/benefitsOrganic.svg" />
                <img src="/home/benefitsGmo.svg" />
                <img src="/home/benefitsGluten.svg" />
              </div>
            </div>
            <img src="/home/featuredProduct.jpeg" />
          </>
        }}
      </Await>
    </Suspense>
  </section>
  );
}

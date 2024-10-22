import { Await, NavLink, useLoaderData } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { Suspense } from "react";
import { loader } from "~/routes/($locale)._index";
import { AddToCartButton } from "../AddToCartButton";
import { pricePerPatch } from "types";
import { useAside } from "../Aside";

export function Featured() {
  const data = useLoaderData<typeof loader>();
  const { open } = useAside();

  return (<section className="home-featured">
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.featuredProducts}>
        {(response) => {
          const featuredProduct = response.collection.products.nodes[0];
          const pricePerPatch: pricePerPatch = JSON.parse(featuredProduct.pricePerPatch.value) as pricePerPatch;

          return <>
            <div className="featured-info">
              <h1>
                Get started with your<br />
                {featuredProduct.title.replace('The ', '')}<img src="/featuredHashtag.svg" /><img src="/featuredSmile.svg" />
              </h1>
              <div className="details">
                <div className="main-details">
                  <strong>{featuredProduct.title}<Money data={featuredProduct.priceRange.minVariantPrice} /></strong>
                  <div className="patch-details">
                    <strong>24 patches</strong>
                    <strong><Money data={{ amount: pricePerPatch.amount, currencyCode: pricePerPatch.currency_code }} />/patch</strong>
                  </div>
                  <p>Hangover relief with a nutrient boost, in a simple patch.</p>
                </div>

                <AddToCartButton
                  className="add-to-cart"
                  onClick={() => { open('cart') }}
                  lines={
                    [
                      {
                        merchandiseId: featuredProduct.variants.nodes[0].id,
                        quantity: 1,
                        selectedVariant: featuredProduct.variants.nodes[0],
                      },
                    ]
                  }
                >
                  Add to Cart
                </AddToCartButton>

                <div className="order-gurantees">
                  <span><img src="/checkCircle.svg" />60-day money back guarantee</span>
                  <span><img src="/checkCircle.svg" />Update or Cancel Anytime</span>
                </div>
              </div>
              <div className="featured-benefits">
                <img src="/home/benefitsPesticide.svg" />
                <img src="/home/benefitsAntioxidant.svg" />
                <img src="/home/benefitsOrganic.svg" />
                <img src="/home/benefitsGmo.svg" />
                <img src="/home/benefitsGluten.svg" />
                <img className="mobile-benefit" src="/home/benefitsSustainable.svg" />
              </div>
            </div>
            <img src="/home/featuredProduct.webp" />
          </>
        }}
      </Await>
    </Suspense>
  </section>
  );
}

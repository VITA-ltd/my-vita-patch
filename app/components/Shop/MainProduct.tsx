import { Await, NavLink, useLoaderData } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { Suspense, useEffect, useState } from "react";
import { loader } from "~/routes/($locale).shop._index";
import { AddToCartButton } from "../AddToCartButton";
import gsap from "gsap";
import { CustomEase } from 'gsap/all';

export function MainProduct() {
  const data = useLoaderData<typeof loader>();
  const [openInfo, setOpenInfo] = useState<number | null>(null);
  const [subscribe, setSubscribe] = useState<boolean>(true);
  const [selectedPlan, setSelectedPlan] = useState<number>(0);

  useEffect(() => {
    gsap.timeline()
      .to(`.expandable-info`, {
        height: '3.5rem',
        color: 'transparent',
        duration: 0.3,
        ease: CustomEase.create("", "0.77, 0, 0, 0.77")
      }).play()

    gsap.timeline()
      .to(`#expandable-info-${openInfo}`, {
        height: 'auto',
        duration: 0.3,
        color: 'white',
        ease: CustomEase.create("", "0.77, 0, 0, 0.77")
      }).play()
  }, [openInfo])

  return (<section className="shop-main">
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.featuredProducts}>
        {(response) => {
          const featuredProduct = response.collection.products.nodes[0];

          let subscriptionPrice = featuredProduct.priceRange.minVariantPrice.amount;
          const subscriptionPrice2 = `${Number(featuredProduct.priceRange.minVariantPrice.amount) * 0.75}`;
          let subscriptionAmount = 0;

          if (featuredProduct.sellingPlanGroups.nodes[0].sellingPlans.nodes[selectedPlan].priceAdjustments[0].adjustmentValue.__typename === 'SellingPlanFixedAmountPriceAdjustment') {
            subscriptionAmount = Number(featuredProduct.sellingPlanGroups.nodes[0].sellingPlans.nodes[selectedPlan].priceAdjustments[0].adjustmentValue.adjustmentAmount.amount);
            subscriptionPrice = `${Number(featuredProduct.priceRange.minVariantPrice.amount) - subscriptionAmount}`;
          }

          return <>
            <div className="mobile-image-cover" />
            <img src={featuredProduct.shopFeaturedImage.reference ? featuredProduct.shopFeaturedImage.reference.image.url : ''} />
            {/* <img src="/shop/featuredProduct.jpeg" /> */}
            <div className="main-info">
              <h1><span className="product-title">{featuredProduct.title}</span></h1>
              <strong>24 patches</strong>
              <p>{featuredProduct.description}</p>

              <form className="main-selection">
                <div className="purchase-option">
                  <input type="checkbox" checked={!subscribe} onClick={() => { setSubscribe(false) }} />
                  <p>
                    Regular Price | <Money data={featuredProduct.priceRange.minVariantPrice} /><br />
                    <span>One-Time Purchase</span>
                  </p>
                </div>

                <div className="purchase-option">
                  <input type="checkbox" checked={subscribe} onClick={() => { setSubscribe(true) }} />
                  <p>
                    Subscribe & Save | <Money data={{ amount: subscriptionPrice, currencyCode: featuredProduct.priceRange.minVariantPrice.currencyCode }} /> now<br />
                    <span>(Regular Price = <Money data={featuredProduct.priceRange.minVariantPrice} />)</span>
                  </p>
                </div>

                <div className="selection-container">
                  <select disabled={!subscribe} value={selectedPlan} onChange={(e) => { setSelectedPlan(Number(e.target.value)) }}>
                    {
                      featuredProduct.sellingPlanGroups.nodes[0].options[0].values.map((option, i) => {
                        return <option value={i}>{option}</option>
                      })
                    }
                  </select>
                </div>

                <ul>
                  <li>Instant 17% savings <strong>(<Money data={{ amount: subscriptionPrice, currencyCode: featuredProduct.priceRange.minVariantPrice.currencyCode }} /> <del><Money data={featuredProduct.priceRange.minVariantPrice} /></del> now)</strong></li>
                  <li><strong>25% OFF</strong> future deliveries <strong>(<Money data={{ amount: subscriptionPrice2, currencyCode: featuredProduct.priceRange.minVariantPrice.currencyCode }} /> <del><Money data={featuredProduct.priceRange.minVariantPrice} /></del> per 1 month)</strong></li>
                  <li>Free shipping on your current and future deliveries</li>
                  <li><strong>Cancel/pause</strong> your monthly delivery <strong>anytime</strong>. <a>Learn more</a></li>
                  <li>Your auto-refill is automatically canceled if you decide to <a>return</a> your first order</li>
                </ul>

              </form>

              <AddToCartButton
                className="add-to-cart"
                lines={
                  [
                    {
                      merchandiseId: featuredProduct.variants.nodes[0].id,
                      sellingPlanId: subscribe ? featuredProduct.sellingPlanGroups.nodes[0].sellingPlans.nodes[selectedPlan].id : undefined,
                      quantity: 1,
                      selectedVariant: featuredProduct.variants.nodes[0],
                    },
                  ]
                }
              >
                Add to Cart
              </AddToCartButton>

              <div className="shipping-info">
                <div>
                  <img src="/shop/rocket.svg" />
                  <p>Free US & Canadian<br />shipping over $20</p>
                </div>

                <div>
                  <img src="/shop/returns.svg" />
                  <p>Free<br />Returns</p>
                </div>

                <div>
                  <img src="/shop/moneyBack.svg" />
                  <p>60 day money-<br />back guarantee</p>
                </div>
              </div>

              <div className="why-were-special">
                <h2>WHY WE’RE SPECIAL</h2>

                <h3>Prevents Hangovers Before They Start</h3>
                <p>VITA isn’t about damage control—it’s about avoiding the damage altogether. Our patch works proactively, so you wake up ready, not regretting.</p>

                <h3>Powerful Detox and Recovery</h3>
                <p>Packed with Glutathione, VITA helps your body detox and recover faster, turning a rough morning into a fresh start.</p>

                <h3>All-Natural, All Good</h3>
                <p>Using a blend of natural ingredients like Acai Berry and Ashwagandha, VITA supports your overall well-being, not just your hangover relief.</p>

                <h3>Effortless to Use</h3>
                <p>VITA fits into your life with ease. Just apply the patch and let it work while you enjoy your night out, ensuring a smooth morning ahead.</p>

                <h3>Backed by Science, Trusted by You</h3>
                <p>Our formulation isn’t just effective—it’s backed by research. VITA is a smart choice for anyone looking to take control of their health.</p>

                <h3>More Than Just Relief</h3>
                <p>VITA supports your body in multiple ways, from reducing inflammation to boosting energy, so you feel better all around, not just hangover-free.</p>
              </div>

              <div id="expandable-info-1" className="expandable-info">
                <h2 onClick={() => { setOpenInfo(openInfo === 1 ? null : 1) }}>
                  HOW TO USE
                  <button>
                    <img src={openInfo === 1 ? "/shop/expandMinus.svg" : "/shop/expandPlus.svg"} />
                  </button>
                </h2>
                <p>
                  Applying VITA is simple and quick
                  <ol>
                    <li>Before you start drinking, clean and dry the area where you’ll apply the patch.</li>
                    <li>Peel off the backing and apply the patch to your skin—ideally on a smooth, hairless area like your upper arm or thigh.</li>
                    <li>Wear the patch throughout your night out and keep it on while you sleep.</li>
                    <li>Remove the patch in the morning and start your day feeling refreshed and rejuvenated.</li>
                  </ol>
                </p>
              </div>

              <div id="expandable-info-2" className="expandable-info">
                <h2 onClick={() => { setOpenInfo(openInfo === 2 ? null : 2) }}>
                  INGREDIENTS
                  <button>
                    <img src={openInfo === 2 ? "/shop/expandMinus.svg" : "/shop/expandPlus.svg"} />
                  </button>
                </h2>
                <p>
                  Vitamin A (Retinol) 3333IU 66%*,<br />
                  Vitamin C (Ascorbic Acid) 1000mcg 1666%*,<br />
                  Vitamin D (Cholecalciferol) 200IU 50%*,<br />
                  Vitamin E (D-Apha tocopherol) 50IU 166%*,<br />
                  Thiamin (Thiamine Mononitrate) 25mg 1666%*,<br />
                  Vitamin B2 (Riboflavin) 20mg 1176%*,<br />
                  Vitamin B3 (Niacin) 20mg 100%*,<br />
                  Vitamin B6 (Pyridoxal 5-Phosphate) 50mg 2941%*,<br />
                  Folate (Folic Acid) 4000mcg 1000%*,<br />
                  Vitamin B12 (Methylcobalamin) 1000mcg 16666%*, Pantothenic Acid 25mg 250%*,<br />
                  Magnesium (Magnesium Malate/Orotate) 300mg 75%*, Potassium 100mg 2%*,<br />
                  Choline (Choline Bitartrate) 200mg,<br />
                  Beetroot Extract 100mg,<br />
                  Glutathione 50mg,<br />
                  Turmeric (Curcuma Longa) 50mg,<br />
                  Boswelia 50mg,<br />
                  Taurine 16mg,<br /><br />
                  Green Tea Extract 10mg.Acai Berry Extract, Ashwagandha Full Extract, Astaxanthin, Circumin, Ginger Root Extract, Grape Seed Extract, Milk Thistle Extract, NAC, Pantethine, Picrorhiza Kurroa Extract, Prickly Pear Leaf, White Willow bark<br />
                </p>
              </div>

              <div id="expandable-info-3" className="expandable-info">
                <h2 onClick={() => { setOpenInfo(openInfo === 3 ? null : 3) }}>
                  CAUTION
                  <button>
                    <img src={openInfo === 3 ? "/shop/expandMinus.svg" : "/shop/expandPlus.svg"} />
                  </button>
                </h2>
                <p>
                  For external use only.
                  <ul>
                    <li>Use one patch at a time for up to 12 hours.</li>
                    <li>Do not reuse patches. Apply immediately after opening.</li>
                    <li>Keep out of reach of children under 18.</li>
                    <li>Check for allergies to ingredients before use.</li>
                    <li>Avoid applying to wounds, broken, or sensitive skin.</li>
                    <li>If irritation occurs, discontinue use and consult a healthcare professional.</li>
                    <li>If pregnant, nursing, or taking medication, consult a healthcare professional before use.</li>
                  </ul>
                  <br />
                  These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            </div>
          </>
        }}
      </Await>
    </Suspense>
  </section>
  );
}

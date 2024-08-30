import { Await, NavLink, useLoaderData } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { Suspense, useState } from "react";
import { loader } from "~/routes/($locale).shop._index";

export function MainProduct() {
  const data = useLoaderData<typeof loader>();
  const [openInfo, setOpenInfo] = useState<number | null>(null);

  return (<section className="shop-main">
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.featuredProducts}>
        {(response) => {
          const featuredProduct = response.collection.products.nodes[0];

          return <>
            <img src={featuredProduct.featuredImage ? featuredProduct.featuredImage.url : ''} />
            <div className="main-info">
              <h1>The {featuredProduct.title} Patch</h1>
              <strong>24 patches</strong>
              <p>{featuredProduct.description}</p>
              <form>
                <div className="purchase-option">
                  <input type="checkbox" checked={false} />
                  <p>
                    Regular Price | $12<br />
                    <span>One-Time Purchase</span>
                  </p>
                </div>

                <div className="purchase-option">
                  <input type="checkbox" checked />
                  <p>
                    Subscribe & Save | $10.50 now<br />
                    <span>(Regular Price = $12)</span>
                  </p>
                </div>

                <div className="selection-container">
                  <select>
                    <option>every 1 month</option>
                    <option>every 3 months</option>
                    <option>every 6 months</option>
                    <option>every 12 months</option>
                  </select>
                </div>

                <ul>
                  <li>Instant 15% savings <strong>($10.50 <del>$12</del> now)</strong></li>
                  <li><strong>25% OFF</strong> future deliveries <strong>($9 <del>$12</del> per 1 month)</strong></li>
                  <li>Free shipping on your current and future deliveries</li>
                  <li><strong>Cancel/pause</strong> your monthly delivery <strong>anytime</strong>. <a>Learn more</a></li>
                  <li>Your auto-refill is automatically canceled if you decide to <a>return</a> your first order</li>
                </ul>

              </form>

              <button className="add-to-cart">Add to Cart</button>

              <div className="shipping-info">
                <div>
                  <img src="/shop/rocket.svg" />
                  <p>Free US & Canadian<br />shipping over $10</p>
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

              <div className={`expandable-info ${openInfo === 1 ? 'expanded' : ''}`}>
                <h2>
                  HOW TO USE
                  <button onClick={() => { setOpenInfo(openInfo === 1 ? null : 1) }}>
                    <img src={openInfo === 1 ? "/shop/expandMinus.svg" : "/shop/expandPlus.svg"} />
                  </button>
                </h2>
                <p>
                  Applying VITA is simple and quick
                  <ol>
                    <li>Clean and dry the area where you’ll apply the patch.</li>
                    <li>Peel off the backing and apply the patch to your skin—ideally on a smooth, hairless area like your upper arm or thigh.</li>
                    <li>Wear the patch throughout your night out and keep it on while you sleep.</li>
                    <li>Remove the patch in the morning and start your day feeling refreshed and rejuvenated.</li>
                  </ol>
                </p>
              </div>

              <div className={`expandable-info ${openInfo === 2 ? 'expanded' : ''}`}>
                <h2>I
                  NGREDIENTS
                  <button onClick={() => { setOpenInfo(openInfo === 2 ? null : 2) }}>
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

              <div className={`expandable-info ${openInfo === 3 ? 'expanded' : ''}`}>
                <h2>
                  CAUTION
                  <button onClick={() => { setOpenInfo(openInfo === 3 ? null : 3) }}>
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

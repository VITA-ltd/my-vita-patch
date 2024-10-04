import { Suspense, useEffect, useState } from 'react';
import { Await, NavLink } from '@remix-run/react';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import gsap from "gsap";
import { CustomEase } from 'gsap/all';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header
}: FooterProps) {
  const [openInfo, setOpenInfo] = useState<number | null>(null);

  useEffect(() => {
    gsap.timeline()
      .to(`.mobile-group-container`, {
        height: '54px',
        color: 'transparent',
        duration: 0.2,
        ease: CustomEase.create("", "0.42, 0, 0.58, 1.0")
      }).play()

    gsap.timeline()
      .to(`#mobile-group-container-${openInfo}`, {
        height: 'auto',
        duration: 0.2,
        color: 'white',
        ease: CustomEase.create("", "0.42, 0, 0.58, 1.0")
      }).play()
  }, [openInfo])


  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            <div className='footer-top'>
              <div className='footer-top-links'>
                <div className='footer-links-column'>
                  <strong>Quick Links</strong>
                  <a>Store</a>
                  <a>Routine</a>
                  <a>Subscribe & Save</a>
                </div>
                <div className='footer-links-column'>
                  <strong>About</strong>
                  <a>About Us</a>
                  <a>Philosophy</a>
                  <a>Refill & Sustainability</a>
                  <a>VITA® Chief Nutritionist</a>
                </div>
                <div className='footer-links-column'>
                  <strong>Support & Contact</strong>
                  <a>FAQs</a>
                  <a>Track Your Order</a>
                  <a>Shipping & Returns</a>
                  <a>Consumer Perception Studies</a>
                  <a>Contacts</a>
                </div>

                <div className='footer-email-column'>
                  <strong>Join the Party</strong>
                  <span>Be the first to receive VITA® announcements and product updates.</span>

                  <span className='footer-form-label'>Email Address</span>
                  <form>
                    <input id="email-address" placeholder='Email Address' />
                    <button>Sign Up</button>
                  </form>
                </div>
              </div>

              <div className='mobile-groups'>
                <div id='mobile-group-container-1' className="mobile-group-container">
                  <h2 onClick={() => { setOpenInfo(openInfo === 1 ? null : 1) }}>
                    Quick Links
                    <img src={openInfo === 1 ? "/shop/expandMinus.svg" : "/shop/expandPlus.svg"} />
                  </h2>
                  <p>
                    <a>Store</a>
                    <a>Routine</a>
                    <a>Subscribe & Save</a>
                  </p>
                </div>

                <div id='mobile-group-container-2' className="mobile-group-container">
                  <h2 onClick={() => { setOpenInfo(openInfo === 2 ? null : 2) }}>
                    About
                    <img src={openInfo === 2 ? "/shop/expandMinus.svg" : "/shop/expandPlus.svg"} />
                  </h2>
                  <p>
                    <a>About Us</a>
                    <a>Philosophy</a>
                    <a>Refill & Sustainability</a>
                    <a>VITA® Chief Nutritionist</a>
                  </p>
                </div>

                <div id='mobile-group-container-3' className="mobile-group-container">
                  <h2 onClick={() => { setOpenInfo(openInfo === 3 ? null : 3) }}>
                    Support & Contact
                    <img src={openInfo === 3 ? "/shop/expandMinus.svg" : "/shop/expandPlus.svg"} />
                  </h2>
                  <p>
                    <a>FAQs</a>
                    <a>Track Your Order</a>
                    <a>Shipping & Returns</a>
                    <a>Consumer Perception Studies</a>
                    <a>Contacts</a>
                  </p>
                </div>
              </div>

              <div className='footer-logo'>
                <div className='mobile-links-container'>
                  <div className='mobile-payments-container'>
                    <img src='/visa.png' />
                    <img src='/mastercard.png' />
                    <img src='/paypal.png' />
                    <img src='/applepay.png' />
                    <img src='/shoppay.png' />
                  </div>

                  <div className='mobile-social-links'>
                    <a>
                      <img src='/instagram.svg' />
                    </a>
                    <a>
                      <img src='/facebook.svg' />
                    </a>
                    <a>
                      <img src='/tiktok.svg' />
                    </a>
                  </div>
                </div>

                <img src='/vita.svg' />

                <div className='footer-disclaimer-container'>
                  <div className='footer-payments-container'>
                    <img src='/visa.png' />
                    <img src='/mastercard.png' />
                    <img src='/paypal.png' />
                    <img src='/applepay.png' />
                    <img src='/shoppay.png' />
                  </div>
                  <p>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</p>
                </div>
              </div>
            </div>

            <FooterMenuBottom />
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenuBottom() {
  return (
    <nav className="footer-menu" role="navigation">
      <a href='/policies/terms-of-service' className='footer-link-bottom'>
        Terms & Conditions
      </a>
      <a href='/policies/privacy-policy' className='footer-link-bottom'>
        Privacy Policy
      </a>
      <a href='/policies/accessibility' className='footer-link-bottom'>
        Accessibility
      </a>
      <a className='footer-link-bottom'>
        Consent Preferences
      </a>

      <span className='footer-copywrite'>
        © 2024 Vita, All Rights Reserved.
      </span>

      <a href='/policies/terms-of-service' className='footer-link-bottom-mobile'>
        Terms & Conditions
      </a>
      <a href='/policies/accessibility' className='footer-link-bottom-mobile'>
        Accessibility
      </a>
      <a href='/policies/' className='footer-link-bottom-mobile'>
        Consent Preferences
      </a>
    </nav>
  );
}
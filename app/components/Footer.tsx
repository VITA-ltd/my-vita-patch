import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
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

              <div className='footer-logo'>
                <img src='/vita.svg' />
                <p>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</p>
              </div>
            </div>

            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenuBottom />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenuBottom() {
  return (
    <nav className="footer-menu" role="navigation">
      <a className='footer-link-bottom'>
        Terms & Conditions
      </a>
      <a className='footer-link-bottom'>
        Privacy Policy
      </a>
      <a className='footer-link-bottom'>
        Accessibility
      </a>
      <a className='footer-link-bottom'>
        Consent Preferences
      </a>
      <span className='footer-copywrite'>
        © 2024 Vita, All Rights Reserved.
      </span>
    </nav>
  );
}
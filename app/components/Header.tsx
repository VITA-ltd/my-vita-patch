import { Suspense, useEffect, useState } from 'react';
import { Await, NavLink } from '@remix-run/react';
import { type CartViewPayload, useAnalytics } from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  headerMenu: any;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  headerMenu,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { open } = useAside();
  const { shop, menu } = header;
  const [backgroundActive, setBackgroundActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  let headerImage = "";
  let headerScale = 1;
  let mobileHeaderScale = 1;

  headerMenu.metaobjects.nodes[0].fields.map((field: any) => {
    if (field.key === "image") {
      headerImage = field.reference.image.url;
    } else if (field.key === 'scale') {
      headerScale = Number(field.value);
    } else if (field.key === 'mobile_scale') {
      mobileHeaderScale = Number(field.value);
    }
  })

  useEffect(() => {
    if (window.innerWidth <= 465) {
      setIsMobile(true)
    }

    const scrollListener = () => {
      let scrollActivation: number = 60;

      if (window.innerWidth <= 465) {
        scrollActivation = (window.innerHeight / 2) - 60;
      }

      if (document.body.scrollTop > scrollActivation || window.scrollY > scrollActivation || window.location.pathname !== '/') {
        setBackgroundActive(true);
      } else {
        setBackgroundActive(false);
      }
    }

    document.body.addEventListener('scroll', scrollListener)
    window.addEventListener('scroll', scrollListener)
    scrollListener();
  }, [])

  return (
    <header className={`header ${backgroundActive ? 'header-active' : ''}`}>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <div className='mobile-menu'>
        <button
          onClick={(e) => {
            e.preventDefault();
            open('mobile');
          }}
        >
          Menu
        </button>
      </div>
      <NavLink
        className="header-logo"
        end
        prefetch="intent"
        style={activeLinkStyle}
        to="/"
      >
        <img src={headerImage} style={{ '--desktop-height': `${headerScale * 100}%`, '--mobile-height': `${mobileHeaderScale * 100}%` } as any} />
      </NavLink>
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;

  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">

      <NavLink
        className="header-menu-item"
        end
        onClick={closeAside}
        prefetch="intent"
        style={activeLinkStyle}
        to={"/products/after-party"}
      >
        Shop
      </NavLink>
      <NavLink
        className="header-menu-item"
        end
        onClick={closeAside}
        prefetch="intent"
        style={activeLinkStyle}
        to={"/subscribe-and-save"}
      >
        Subscribe & Save
      </NavLink>
      <NavLink
        className="header-menu-item"
        end
        onClick={closeAside}
        prefetch="intent"
        style={activeLinkStyle}
        to={"/about"}
      >
        About Us
      </NavLink>
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 465) {
      setIsMobile(true)
    }
  })

  return (
    <nav className="header-ctas" role="navigation">
      <SearchToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Log In">
          <Await resolve={isLoggedIn} errorElement="Log In">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Log In')}
          </Await>
        </Suspense>
      </NavLink>

      <CartToggle cart={cart} />
    </nav>
  );
}

function SearchToggle() {
  const { open } = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <div className='bag-container'>
      <a
        className='bag-url'
        href="/cart"
        onClick={(e) => {
          e.preventDefault();
          open('cart');
          publish('cart_viewed', {
            cart,
            prevCart,
            shop,
            url: window.location.href || '',
          } as CartViewPayload);
        }}
      >
        Bag
      </a>
      <a
        className='bag-url cart'
        href="/cart"
        onClick={(e) => {
          e.preventDefault();
          open('cart');
          publish('cart_viewed', {
            cart,
            prevCart,
            shop,
            url: window.location.href || '',
          } as CartViewPayload);
        }}
      >
        <span className='cart-count'>{count === null ? <span>&nbsp;</span> : count}</span>
      </a>
    </div>
  );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

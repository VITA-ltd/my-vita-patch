import { NavLink } from '@remix-run/react';
import { createContext, type ReactNode, useContext, useState } from 'react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  const { type: activeType, close } = useAside();
  const expanded = type === activeType;

  return (
    <div
      aria-modal
      className={`overlay${type === 'mobile' ? ' mobile' : ''}${expanded ? ' expanded' : ''}`}
      role="dialog"
    >
      <button className="close-outside" onClick={close} />
      <aside>
        {type !== 'mobile' ?
          <>
            <header>
              <h3>{heading}</h3>
              <button className="close reset" onClick={close}>
                <img src="/shop/expandPlus.svg" />
              </button>
            </header>
            <p>Start shopping to qualify for free shipping<span className='helvetica'>!</span></p>
            <div className='shipping-progress' style={{ backgroundImage: 'linear-gradient(90deg, white 0%, transparent 0%)' }} />
          </>
          :
          <>
            <header>
              <NavLink to="/"><img src='/vita.svg' /></NavLink>
              <button className="close reset" onClick={close}>
                Close
              </button>
            </header>
          </>
        }
        <main>{children}</main>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {
        type !== 'closed' &&
        <style>
          {`
            body, html {
              overflow: hidden !important;
            }
          `}
        </style>
      }
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

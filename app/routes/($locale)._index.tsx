import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type {
  CollectionQuery,
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { Landing } from '~/components/HomePage/Landing';
import { Intro } from '~/components/HomePage/Intro';
import { Ingredients } from '~/components/HomePage/Ingredients';
import { Testimonials } from '~/components/HomePage/Testimonials';
import { Gallery } from '~/components/HomePage/Gallery';

export const meta: MetaFunction = () => {
  return [{ title: 'Hydrogen | Home' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({ ...deferredData, ...criticalData });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(COLLECTION_QUERY, { variables: { handle: 'featured', first: 3 } })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <Landing />
      <Testimonials />
      <Intro />
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <RecommendedProducts products={data.recommendedProducts} />
      <Ingredients />
      <Gallery />
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<CollectionQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Get Your VITA® Patch</h2>
      <h3>Choose your patch</h3>

      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response && response.collection
                ? response.collection.products.nodes.map((product) => {
                  /* @ts-ignore */
                  const pricePerPatch = JSON.parse(product.pricePerPatch.value);

                  return (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      {/* @ts-ignore */}
                      {product.tags.includes("New") &&
                        <div className='new-tag'>New</div>
                      }

                      <h4>{product.title}</h4>
                      <span className='price'>
                        <Money data={product.priceRange.minVariantPrice} />
                        {/* @ts-ignore */}
                        {!product.compareAtPriceRange.minVariantPrice.amount.startsWith("0") &&
                          /* @ts-ignore */
                          <Money className='default-price' withoutCurrency data={product.compareAtPriceRange.minVariantPrice} />
                        }
                      </span>

                      <span className='price'>
                        {/* @ts-ignore */}
                        <Money withoutCurrency data={{ amount: pricePerPatch.amount, currencyCode: pricePerPatch.currency_code }} />/patch
                      </span>

                      {product.featuredImage &&
                        <Image
                          data={product.featuredImage}
                          aspectRatio="1/1"
                          sizes="(min-width: 45em) 20vw, 50vw"
                        />
                      }

                      {/* @ts-ignore */}
                      <button disabled={product.totalInventory <= 0} className={`purchase-button ${product.totalInventory <= 0 && 'disabled'}`}>
                        {/* @ts-ignore */}
                        {product.tags.includes("Coming Soon") ? "Coming Soon" : product.totalInventory > 0 ? "Start Now" : "Email When Availabe"}
                      </button>

                      <p className='product-description'>
                        60-day Money Back Guarantee<br />
                        Pause or Cancel Anytime<br />
                        Free Welcome Kit
                      </p>
                    </Link>
                  )
                })
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    totalInventory
    tags
    pricePerPatch: metafield(
      key: "price_per_patch"
      namespace: "custom"
    ) {
      value
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
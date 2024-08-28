import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import { Landing } from '~/components/HomePage/Landing';
import { Intro } from '~/components/HomePage/Intro';
import { Ingredients } from '~/components/HomePage/Ingredients';
import { Testimonials } from '~/components/HomePage/Testimonials';
import { Gallery } from '~/components/HomePage/Gallery';
import { CustomerTestimonials } from '~/components/HomePage/CustomerTestimonials';
import { Benefits } from '~/components/HomePage/Benefits';
import { FeaturedProduct, GalleryImage, pricePerPatch, Testimonial } from 'types';
import { Featured } from '~/components/HomePage/Featured';

export const meta: MetaFunction = () => {
  return [{ title: 'Hydrogen | Home' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const featuredProducts = loadFeaturedProducts(args);
  const galleryImages = loadGalleryImages(args);
  const testimonials = loadTestimonials(args);

  return defer({ ...featuredProducts, ...galleryImages, ...testimonials });
}

function loadFeaturedProducts({ context }: LoaderFunctionArgs) {
  const featuredProducts: Promise<FeaturedProduct> = context.storefront
    .query(FEATURED_PRODUCTS_QUERY, { variables: { handle: 'featured', first: 3 } })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
  };
}

function loadTestimonials({ context }: LoaderFunctionArgs) {
  const testimonials: Promise<Testimonial> = context.storefront
    .query(TESTIMONIALS_QUERY, { variables: { first: 10 } })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    testimonials,
  };
}

function loadGalleryImages({ context }: LoaderFunctionArgs) {
  const galleryImages: Promise<GalleryImage> = context.storefront
    .query(GALLERY_QUERY, { variables: { first: 5 } })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    galleryImages,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <Landing />
      <CustomerTestimonials />
      <Intro />
      <Testimonials />
      <Featured />
      {/* <RecommendedProducts products={data.featuredProducts} /> */}
      <Benefits />
      <Ingredients />
      <Gallery />
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<FeaturedProduct | null>;
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
                  const pricePerPatch = JSON.parse(product.pricePerPatch.value) as pricePerPatch;

                  return (
                    <div
                      key={product.id}
                      className="recommended-product"
                    >
                      {product.tags.includes("New") &&
                        <div className='new-tag'>New</div>
                      }

                      <h4>{product.title}</h4>
                      <span className='price'>
                        <Money data={product.priceRange.minVariantPrice} />
                        {!product.compareAtPriceRange.minVariantPrice.amount.startsWith("0") &&
                          <Money className='default-price' withoutCurrency data={product.compareAtPriceRange.minVariantPrice} />
                        }
                      </span>

                      <span className='price'>
                        <Money withoutCurrency data={{ amount: pricePerPatch.amount, currencyCode: pricePerPatch.currency_code }} />/patch
                      </span>

                      {product.featuredImage &&
                        <Image
                          data={product.featuredImage}
                          aspectRatio="1/1"
                          sizes="(min-width: 45em) 20vw, 50vw"
                        />
                      }

                      <Link
                        key={product.id}
                        className={`purchase-button ${!product.totalInventory || product.totalInventory <= 0 && 'disabled'}`}
                        to={!product.totalInventory || product.totalInventory <= 0 ? '' : `/products/${product.handle}`}
                      >
                        {product.tags.includes("Coming Soon") ? "Coming Soon" : product.totalInventory && product.totalInventory > 0 ? "Start Now" : "Email When Availabe"}
                      </Link>

                      <p className='product-description'>
                        60-day Money Back Guarantee<br />
                        Pause or Cancel Anytime<br />
                        Free Welcome Kit
                      </p>
                    </div>
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
const FEATURED_PRODUCTS_QUERY = `#graphql
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

const TESTIMONIALS_QUERY = `#graphql
  fragment Testimonial on Metaobject {
    id
    handle
    fields {
      key
      value
      reference {
        ... on MediaImage {
          image {
            url
          }
        }
      }
    }
  }
  query Metaobject(
    $first: Int
  ) {
    metaobjects(type: "testimonial", first: $first, reverse: true) {
      nodes {
        ...Testimonial
      }
    }
  }
` as const;

const GALLERY_QUERY = `#graphql
  fragment GalleryImage on Metaobject {
    id
    handle
    fields {
      reference {
        ... on MediaImage {
          image {
            url
          }
        }
      }
    }
  }
  query Metaobject(
    $first: Int
  ) {
    metaobjects(type: "vita_gallery_image", first: $first, sortKey: "UPDATED_AT", reverse: true) {
      nodes {
        ...GalleryImage
      }
    }
  }
` as const;
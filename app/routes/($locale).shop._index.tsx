import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import { FeaturedProduct, GalleryImage, pricePerPatch, Testimonial } from 'types';
import { MainProduct } from '~/components/Shop/MainProduct';
import { Ratings } from '~/components/Shop/Ratings';
import { Difference } from '~/components/Shop/Difference';

export const meta: MetaFunction = () => {
  return [{ title: 'Hydrogen | Shop' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const featuredProducts = loadFeaturedProducts(args);

  return defer({ ...featuredProducts });
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

export default function Shop() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="shop">
      <MainProduct />
      <Ratings />
      <Difference />
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
    description
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
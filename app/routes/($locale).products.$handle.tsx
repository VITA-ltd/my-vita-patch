import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { getSeoMeta, Image, Money } from '@shopify/hydrogen';
import { FeaturedProduct, GalleryImage, pricePerPatch, ShopTestimonial, Testimonial } from 'types';
import { MainProduct } from '~/components/Shop/MainProduct';
import { Ratings } from '~/components/Shop/Ratings';
import { Difference } from '~/components/Shop/Difference';
import { Faq } from '~/components/Shop/Faq';
import { SHOP_QUERY } from '~/lib/fragments';

export const meta: MetaFunction = ({ data }: any) => {
  const seo = data.seo.shop;

  return getSeoMeta({
    title: `${seo.name} | ${data.featuredProducts.collection.products.nodes[0].title}`,
    description: data.featuredProducts.collection.products.nodes[0].description,
    media: seo.coverImage ? seo.coverImage.image.url : undefined
  })
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const seo = await loadShopSeo(args);
  const featuredProducts = await loadFeaturedProducts(args);
  const shopTestimonials = await loadShopTestimonials(args);

  return defer({ ...seo, ...shopTestimonials, ...featuredProducts });
}

async function loadFeaturedProducts({ context }: LoaderFunctionArgs) {
  const featuredProducts: FeaturedProduct = await context.storefront
    .query(FEATURED_PRODUCTS_QUERY, { variables: { handle: 'featured', first: 3 } })
  return {
    featuredProducts,
  };
}

async function loadShopSeo({ context }: LoaderFunctionArgs) {
  const seo = await context.storefront.query(SHOP_QUERY)

  return {
    seo,
  };
}

async function loadShopTestimonials({ context }: LoaderFunctionArgs) {
  const shopTestimonials: ShopTestimonial = await context.storefront
    .query(SHOP_TESTIMONIAL_QUERY, { variables: { first: 10 } })
  return {
    shopTestimonials,
  };
}

export default function Product() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="shop">
      <MainProduct />
      <Ratings />
      <Difference />
      <Faq />
    </div>
  );
}
const SELLING_PLAN_FRAGMENT = `#graphql
fragment SellingPlanMoney on MoneyV2 {
  amount
  currencyCode
}
fragment SellingPlan on SellingPlan {
  id
  options {
    name
    value
  }
 priceAdjustments {
   adjustmentValue {
     ... on SellingPlanFixedAmountPriceAdjustment {
       __typename
       adjustmentAmount {
         ... on MoneyV2 {
            ...SellingPlanMoney
         }
       }
     }
     ... on SellingPlanFixedPriceAdjustment {
       __typename
       price {
         ... on MoneyV2 {
           ...SellingPlanMoney
         }
       }
     }
     ... on SellingPlanPercentagePriceAdjustment {
       __typename
       adjustmentPercentage
     }
   }
   orderCount
 }
 recurringDeliveries
 checkoutCharge {
   type
   value {
     ... on MoneyV2 {
       ...SellingPlanMoney
     }
     ... on SellingPlanCheckoutChargePercentageValue {
       percentage
     }
   }
 }
}
` as const;

const SELLING_PLAN_GROUP_FRAGMENT = `#graphql
  ${SELLING_PLAN_FRAGMENT}
  fragment SellingPlanGroup on SellingPlanGroup {
    name
    options {
      name
      values
    }
    sellingPlans(first:10) {
      nodes {
        ...SellingPlan
      }
    }
  }
` as const;

const PRODUCT_ITEM_FRAGMENT = `#graphql
  ${SELLING_PLAN_GROUP_FRAGMENT}
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
    shopFeaturedImage: metafield(
      key: "shop_featured_image"
      namespace: "custom"
    ) {
      value
      reference {
        ... on MediaImage {
          image {
            url
          }
        }
      }
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
        id
        title
        image {
          id
          altText
          url
          width
          height
        }
        price {
          ...MoneyProductItem
        }
        product {
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
          shopFeaturedImage: metafield(
            key: "shop_featured_image"
            namespace: "custom"
          ) {
            value
            reference {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
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
        }
        selectedOptions {
          name
          value
        }
      }
    }
    sellingPlanGroups(first:10) {
      nodes {
        ...SellingPlanGroup
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

const SHOP_TESTIMONIAL_QUERY = `#graphql
  fragment ShopTestimonial on Metaobject {
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
    metaobjects(type: "shop_testimonial", first: $first, sortKey: "UPDATED_AT", reverse: true) {
      nodes {
        ...ShopTestimonial
      }
    }
  }
` as const;
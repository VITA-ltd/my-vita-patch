import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense, useEffect, useState } from 'react';
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

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 430) {
      setIsMobile(true)
    }
  })

  return (
    <div className="home">
      <Landing />
      {isMobile ?
        <Testimonials />
        :
        <CustomerTestimonials />
      }
      <Intro />
      {!isMobile &&
        <Testimonials />
      }
      <Featured />
      <Benefits />
      <Ingredients />
      <Gallery />
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
        id
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
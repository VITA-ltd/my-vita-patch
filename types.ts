import { Collection, Product, CurrencyCode } from "@shopify/hydrogen/storefront-api-types";

export interface FeaturedProduct {
  collection: {
    products: {
      nodes: FeaturedProductFields[]
    }
  }
}

interface FeaturedProductFields extends Product {
  pricePerPatch: {
    value: string;
  };
  shopFeaturedImage: {
    reference?: {
      image: {
        url: string;
      }
    }
  };
}

export type pricePerPatch = {
  amount: string;
  currency_code: CurrencyCode;
}

export type GalleryImage = {
  metaobjects: {
    nodes: {
      id: string;
      handle: string;
      fields: {
        reference: {
          image: {
            url: string;
          }
        }
      }[]
    }[]
  }
}

export type Testimonial = {
  metaobjects: {
    nodes: {
      id: string;
      handle: string;
      fields: {
        key: 'logo' | 'quote',
        value: string,
        reference: {
          image: {
            url: string;
          }
        } | null;
      }[]
    }[]
  }
}

export type HeaderLogo = {
  metaobjects: {
    nodes: {
      id: string;
      handle: string;
      fields: {
        key: 'image' | 'scale',
        value: string,
        reference: {
          image: {
            url: string;
          }
        } | null;
      }[]
    }[]
  }
}

export type ShopTestimonial = {
  metaobjects: {
    nodes: {
      id: string;
      handle: string;
      fields: {
        key: 'image' | 'quote' | 'customer_name',
        value: string,
        reference: {
          image: {
            url: string;
          }
        }
      }[]
    }[]
  }
}
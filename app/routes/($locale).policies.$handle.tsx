import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Link, useLoaderData, type MetaFunction } from '@remix-run/react';
import { type Shop } from '@shopify/hydrogen/storefront-api-types';
import { RichText } from '@shopify/hydrogen';

type SelectedPolicies = keyof Pick<
  Shop,
  'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
>;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.policy.title ?? ''}` }];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Response('No handle was passed in', { status: 404 });
  }

  const policyName = params.handle.replace(
    /-([a-z])/g,
    (_: unknown, m1: string) => m1.toUpperCase(),
  ) as SelectedPolicies;

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    const data = await context.storefront.query(POLICY_METAOBJECT_QUERY, {
      variables: {
        handle: {
          handle: params.handle,
          type: 'additional_policies'
        }
      },
    });

    if (data.metaobject) {
      return json({
        policy: {
          id: data.metaobject,
          handle: data.metaobject.handle,
          body: data.metaobject.fields[0].value,
          title: data.metaobject.fields[1].value,
          url: `/policies/${data.metaobject.handle}`
        }
      })
    }

    throw new Response('Could not find the policy', { status: 404 });
  }

  return json({ policy });
}

export default function Policy() {
  const { policy } = useLoaderData<typeof loader>();

  return (
    <div className="policy">
      <div className='policies-list'>
        <h1>Legal</h1>
        <a href='/policies/terms-of-service'>Terms & Conditions</a>
        <a href='/policies/privacy-policy'>Privacy Policy</a>
        <a href='/policies/accessibility'>Accessibility</a>
      </div>
      {
        policy.body.startsWith(`{"type":"root","children":[`) ?
          <RichText
            className='policy-content'
            data={policy.body}
          />
          :
          <div className='policy-content' dangerouslySetInnerHTML={{ __html: policy.body }} />
      }
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
` as const;

const POLICY_METAOBJECT_QUERY = `#graphql
  fragment AdditionalPolicy on Metaobject {
    id
    handle
    fields {
      key
      value
    }
  }

  query Metaobject($handle: MetaobjectHandleInput) {
    metaobject(
      handle: $handle
    ) {
      ...AdditionalPolicy
    }
  }
` as const;
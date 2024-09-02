import { Await, NavLink, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { loader } from "~/routes/($locale)._index";

export function Gallery() {
  const data = useLoaderData<typeof loader>();

  return (<section className="home-gallery">
    <div className="home-gallery-top">
      <span>Join The Movement</span>
      <a>View Full Gallery <img src="/arrow.svg" /></a>
    </div>
    <h3 className="home-gallery-hashtag"><i>#</i>VITApatch</h3>

    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.galleryImages}>
        {(response) => {
          return <>
            <div className="home-image-gallery-top">
              {response.metaobjects.nodes.slice(0, 2).map((image: any, i: number) => {
                return <img src={image.fields[0].reference.image.url} key={i} />
              })}
            </div>
            <div className="home-image-gallery-bottom">
              {response.metaobjects.nodes.slice(2, 5).map((image: any, i: number) => {
                return <img src={image.fields[0].reference.image.url} key={i} />
              })}
            </div>
          </>
        }}
      </Await>
    </Suspense>
    <button className="home-gallery-upload-button">
      <p>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 1.66669C12 1.1144 11.5523 0.666687 11 0.666687C10.4477 0.666687 10 1.1144 10 1.66669V7.66669C10 8.77126 9.10459 9.66669 8.00002 9.66669H1.66669C1.1144 9.66669 0.666687 10.1144 0.666687 10.6667C0.666687 11.219 1.1144 11.6667 1.66669 11.6667H8.00002C9.10459 11.6667 10 12.5621 10 13.6667V20.3334C10 20.8856 10.4477 21.3334 11 21.3334C11.5523 21.3334 12 20.8856 12 20.3334V13.6667C12 12.5621 12.8955 11.6667 14 11.6667H20.3334C20.8856 11.6667 21.3334 11.219 21.3334 10.6667C21.3334 10.1144 20.8856 9.66669 20.3334 9.66669H14C12.8955 9.66669 12 8.77126 12 7.66669V1.66669Z" fill="none" />
        </svg>
        <span>Upload Yours</span>
      </p>
    </button>
  </section>
  );
}

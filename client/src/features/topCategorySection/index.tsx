import React from "react";
import Link from "next/link";

type Props = {};

function TopCategorySection({ data }) {
  return (
    <div className="home__top__categories__section">
      <div className="top__categories__top__bar">
        <div className="title__wrapper">
          <h3 className="section__title">Top Categories</h3>
        </div>
        <Link href="/discover" className="link">
          <div className="home__to_discover">Discover Categories {">"} </div>
        </Link>
      </div>
    </div>
  );
}

export default TopCategorySection;

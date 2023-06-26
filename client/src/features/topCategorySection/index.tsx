import React from "react";
import withHomeSection from "../../hoc/withHomeSection/index";
import GetCategories from "./components/getCategories";

const WrappedComponent = withHomeSection(GetCategories);

type Props = {};

function TopCategorySection({ data }) {
  return (
    <WrappedComponent
      title="Top Categories"
      linkUrl="/discover"
      linkText="Discover Categories"
      additionalProp="Value"
    />
  );
}

export default TopCategorySection;

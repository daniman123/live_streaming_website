import CategoryCard from "@/features/categoryCard";
import "./style/style.css"
import React from "react";

type Props = {};

function GetCategories({}: Props) {
  return (
    <div className="cat__cards__home__section">
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </div>
  );
}

export default GetCategories;

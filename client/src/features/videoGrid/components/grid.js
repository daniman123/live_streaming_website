import VideoGridItem from "./videoGridItem";

function Grid(loading, data) {
  console.log("🚀 ~ file: grid.js:4 ~ Grid ~ data:", { data });
  if (loading) {
    return <div>Loading...</div>;
  }

  return Object.values(data).map((item, index) => (
    <VideoGridItem
      key={index}
      title="Title" // Replace "Title" with the actual title prop
      item={item}
      category="Category" // Replace "Category" with the actual category prop
    />
  ));
}

export default Grid;

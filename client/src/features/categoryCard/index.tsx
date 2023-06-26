import "./style/style.css"

const image = "https://images.dog.ceo/breeds/hound-walker/n02089867_1824.jpg";
const category = "Only Up!";
const totalViewers = 100000;

const CategoryCard = () => {
  return (
    <div className="category__card">
      <div className="image__content">
        <img src={image} alt="Category" className="category__image" />
      </div>
      <div className="card__meta__data">
        <p className="category__name">{category}</p>
        <p className="category__viewers">{totalViewers} Viewers</p>
      </div>
    </div>
  );
};

export default CategoryCard;

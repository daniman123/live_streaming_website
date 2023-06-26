import Link from "next/link";
import "./style/style.css";

const withHomeSection = (Component) => {
  return function HomeSectionWrapper({ title, linkUrl, linkText, ...props }) {
    return (
      <div className="home__content__section">
        <div className="home__content__section__top__bar">
          <div className="title__wrapper">
            <h3 className="section__title">{title}</h3>
          </div>
          <Link href={linkUrl} className="link">
            <div className="home__to__link">
              {linkText} {"> "}
            </div>
          </Link>
        </div>
        <div className="home__section__content">
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default withHomeSection;

import "./style/style.css";

export default function withFeedWrapper(Component) {
  return (...args) => {
    return (
      <div className="content__feed__section">
        <Component data={args} />
      </div>
    );
  };
}

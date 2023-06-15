import React, { useState } from "react";

const withPopup = (WrappedComponent, buttonName) => {
  return (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen((prevState) => !prevState);
    };

    return (
      <>
        <button onClick={togglePopup}>{buttonName}</button>
        {isOpen && <WrappedComponent {...props} togglePopup={togglePopup} />}
      </>
    );
  };
};

export default withPopup;

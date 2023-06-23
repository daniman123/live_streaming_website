import React from "react";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <div className="logo__wrapper">
      <Link href="/" passHref>
        <a className="hidden-link">
          <div className="logo">LOGO</div>
        </a>
      </Link>
    </div>
  );
};

export default Logo;

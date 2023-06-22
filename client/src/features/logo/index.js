import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <div className="logo__wrapper">
      <Link href="/" className="hidden-link">
        <div className="logo">LOGO</div>
      </Link>
    </div>
  );
}

export default Logo;

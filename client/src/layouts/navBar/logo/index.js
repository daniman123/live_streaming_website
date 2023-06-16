import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="hidden-link">
      <div>Logo</div>
    </Link>
  );
}

export default Logo;

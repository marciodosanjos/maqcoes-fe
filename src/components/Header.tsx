/* ./components/header.js */
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <nav>
        <div>
          <Link href="/">Maqcoes</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;

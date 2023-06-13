import React from "react";
import Link from "next/link";

function ActionButtons() {
  return (
    <div className="action_buttons">
      <Link href={"/"} className="hidden-link">
        <button className="home_button">Home</button>
      </Link>
      <button className="discover_button">Discover</button>
      <button className="peek_button">Peek</button>
      <button className="pulse_button">Pulse</button>
    </div>
  );
}

export default ActionButtons;

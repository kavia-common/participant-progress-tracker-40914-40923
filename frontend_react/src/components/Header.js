import React from "react";

// PUBLIC_INTERFACE
function Header({ onToggleSidebar }) {
  /** Top application header with title and optional sidebar toggle for small screens. */
  return (
    <header className="bpp-header">
      <button
        type="button"
        className="bpp-header__menuButton"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <div className="bpp-header__titleWrap">
        <h1 className="bpp-header__title">Bootcamp Progress Portal</h1>
      </div>
    </header>
  );
}

export default Header;

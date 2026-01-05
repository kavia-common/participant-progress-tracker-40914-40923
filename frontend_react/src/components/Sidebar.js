import React from "react";

const NAV_ITEMS = ["Dashboard", "Daily Update", "Upload Work", "My Progress"];

// PUBLIC_INTERFACE
function Sidebar({ activeItem, onSelectItem, isOpen }) {
  /** Left sidebar navigation for the dashboard layout (static placeholders). */
  return (
    <aside className={`bpp-sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="bpp-sidebar__label">Navigation</div>

      <nav className="bpp-sidebar__nav" aria-label="Primary">
        {NAV_ITEMS.map((label) => {
          const isActive = label === activeItem;
          return (
            <button
              key={label}
              type="button"
              className={`bpp-sidebar__navItem ${isActive ? "is-active" : ""}`}
              onClick={() => onSelectItem(label)}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <div className="bpp-sidebar__footer">
        <div className="bpp-sidebar__hint">
          Static placeholders only (no routing yet).
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

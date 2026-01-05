import React from "react";

// PUBLIC_INTERFACE
function DashboardContent({ activeSection }) {
  /** Main content area showing static placeholder cards (no data fetching). */
  return (
    <main className="bpp-main" role="main">
      <div className="bpp-main__top">
        <div className="bpp-main__breadcrumbs">
          <span className="bpp-pill">Section</span>
          <span className="bpp-main__sectionName">{activeSection}</span>
        </div>

        <p className="bpp-main__subtitle">
          This is a simple dashboard shell with static placeholders.
        </p>
      </div>

      <section className="bpp-cards" aria-label="Dashboard placeholders">
        <article className="bpp-card">
          <h2 className="bpp-card__title">Today&apos;s Activity</h2>
          <p className="bpp-card__text">
            Placeholder summary of what you worked on today.
          </p>
          <ul className="bpp-card__list">
            <li>Morning: Review goals</li>
            <li>Midday: Coding session</li>
            <li>Evening: Wrap-up notes</li>
          </ul>
        </article>

        <article className="bpp-card">
          <h2 className="bpp-card__title">Bootcamp Tasks</h2>
          <p className="bpp-card__text">
            Placeholder list of tasks you&apos;re expected to complete.
          </p>
          <ul className="bpp-card__list">
            <li>Read module materials</li>
            <li>Complete exercises</li>
            <li>Submit a short update</li>
          </ul>
        </article>

        <article className="bpp-card">
          <h2 className="bpp-card__title">Submission Status</h2>
          <p className="bpp-card__text">
            Placeholder status for work submissions and reviews.
          </p>
          <div className="bpp-statusGrid">
            <div className="bpp-statusItem">
              <div className="bpp-statusItem__label">Latest Upload</div>
              <div className="bpp-statusItem__value">Not submitted</div>
            </div>
            <div className="bpp-statusItem">
              <div className="bpp-statusItem__label">Mentor Review</div>
              <div className="bpp-statusItem__value">Pending</div>
            </div>
            <div className="bpp-statusItem">
              <div className="bpp-statusItem__label">Overall</div>
              <div className="bpp-statusItem__value">On track</div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default DashboardContent;

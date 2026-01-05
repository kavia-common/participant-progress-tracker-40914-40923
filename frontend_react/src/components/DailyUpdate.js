import React, { useMemo, useState } from "react";

/**
 * Daily Update page: a simple, static (no backend) form that lets users record
 * what they worked on and issues faced for a given day.
 */

// PUBLIC_INTERFACE
function DailyUpdate() {
  /** Static daily update form that stores submissions in component state and renders them below the form. */
  const dayOptions = useMemo(() => {
    // Keep it simple; easy to extend later.
    return Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`);
  }, []);

  const [day, setDay] = useState(dayOptions[0] ?? "Day 1");
  const [workDone, setWorkDone] = useState("");
  const [issuesFaced, setIssuesFaced] = useState("");

  // Store the latest submitted update (static behavior).
  const [submittedUpdate, setSubmittedUpdate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedWork = workDone.trim();
    const trimmedIssues = issuesFaced.trim();

    // Beginner-friendly validation: require at least one field besides day.
    if (!trimmedWork && !trimmedIssues) {
      // Avoid alert spam; simple inline message via state could be added later.
      // For now, keep it minimal.
      setSubmittedUpdate({
        day,
        workDone: "",
        issuesFaced: "",
        submittedAt: new Date().toISOString(),
        note: "Please enter what you worked on today and/or issues faced before submitting.",
      });
      return;
    }

    setSubmittedUpdate({
      day,
      workDone: trimmedWork,
      issuesFaced: trimmedIssues,
      submittedAt: new Date().toISOString(),
      note: "",
    });

    // Optional: clear fields after submit for quick next entry.
    setWorkDone("");
    setIssuesFaced("");
  };

  return (
    <main className="bpp-main" role="main">
      <div className="bpp-main__top">
        <div className="bpp-main__breadcrumbs">
          <span className="bpp-pill">Section</span>
          <span className="bpp-main__sectionName">Daily Update</span>
        </div>

        <p className="bpp-main__subtitle">
          Record your daily bootcamp progress. This is stored locally (no backend
          yet).
        </p>
      </div>

      <section aria-label="Daily update form">
        <form className="bpp-form" onSubmit={handleSubmit}>
          <div className="bpp-form__grid">
            <div className="bpp-field">
              <label className="bpp-label" htmlFor="daily-day">
                Day
              </label>
              <select
                id="daily-day"
                className="bpp-input"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="bpp-field bpp-field--full">
              <label className="bpp-label" htmlFor="daily-work">
                What did you work on today?
              </label>
              <textarea
                id="daily-work"
                className="bpp-textarea"
                value={workDone}
                onChange={(e) => setWorkDone(e.target.value)}
                rows={5}
                placeholder="Example: Implemented the Daily Update form, learned about React state, and practiced CSS layout."
              />
            </div>

            <div className="bpp-field bpp-field--full">
              <label className="bpp-label" htmlFor="daily-issues">
                Issues faced
              </label>
              <textarea
                id="daily-issues"
                className="bpp-textarea"
                value={issuesFaced}
                onChange={(e) => setIssuesFaced(e.target.value)}
                rows={4}
                placeholder="Example: Had trouble wiring up submit behavior; fixed it by using onSubmit and preventDefault."
              />
            </div>
          </div>

          <div className="bpp-form__actions">
            <button type="submit" className="bpp-button">
              Submit Daily Update
            </button>
          </div>
        </form>
      </section>

      <section className="bpp-submitted" aria-label="Submitted daily update">
        <h2 className="bpp-submitted__title">Submitted Update</h2>

        {!submittedUpdate ? (
          <p className="bpp-submitted__empty">
            No update submitted yet. Fill the form and click “Submit Daily
            Update”.
          </p>
        ) : (
          <article className="bpp-submitted__card">
            <div className="bpp-submitted__meta">
              <span className="bpp-pill">{submittedUpdate.day}</span>
              <span className="bpp-submitted__timestamp">
                {new Date(submittedUpdate.submittedAt).toLocaleString()}
              </span>
            </div>

            {submittedUpdate.note ? (
              <p className="bpp-submitted__note" role="status">
                {submittedUpdate.note}
              </p>
            ) : null}

            <div className="bpp-submitted__content">
              <div className="bpp-submitted__block">
                <div className="bpp-submitted__label">
                  What did you work on today?
                </div>
                <div className="bpp-submitted__text">
                  {submittedUpdate.workDone ? (
                    <pre className="bpp-pre">{submittedUpdate.workDone}</pre>
                  ) : (
                    <span className="bpp-muted">No details provided.</span>
                  )}
                </div>
              </div>

              <div className="bpp-submitted__block">
                <div className="bpp-submitted__label">Issues faced</div>
                <div className="bpp-submitted__text">
                  {submittedUpdate.issuesFaced ? (
                    <pre className="bpp-pre">{submittedUpdate.issuesFaced}</pre>
                  ) : (
                    <span className="bpp-muted">No issues listed.</span>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}

export default DailyUpdate;

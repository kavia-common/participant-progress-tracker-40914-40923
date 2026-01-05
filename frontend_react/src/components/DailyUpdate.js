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

  /**
   * Store all submitted updates (static behavior, local-only).
   * New entries are inserted at the start so the list is reverse chronological
   * (newest first) without needing to sort.
   */
  const [entries, setEntries] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedWork = workDone.trim();
    const trimmedIssues = issuesFaced.trim();

    // Beginner-friendly validation: require at least one field besides day.
    if (!trimmedWork && !trimmedIssues) {
      setValidationMessage(
        "Please enter what you worked on today and/or issues faced before submitting."
      );
      return;
    }

    setValidationMessage("");

    const newEntry = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      day,
      workDone: trimmedWork,
      issuesFaced: trimmedIssues,
      submittedAt: new Date().toISOString(),
    };

    // Prepend to keep newest first.
    setEntries((prev) => [newEntry, ...prev]);

    // Clear form after submit.
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

          {validationMessage ? (
            <p className="bpp-submitted__note" role="status">
              {validationMessage}
            </p>
          ) : null}

          <div className="bpp-form__actions">
            <button type="submit" className="bpp-button">
              Submit Daily Update
            </button>
          </div>
        </form>
      </section>

      <section className="bpp-submitted" aria-label="Submitted daily updates">
        <h2 className="bpp-submitted__title">Submitted Updates</h2>

        {entries.length === 0 ? (
          <p className="bpp-submitted__empty">
            No updates submitted yet. Fill the form and click “Submit Daily
            Update”.
          </p>
        ) : (
          <div className="bpp-submitted__list">
            {entries.map((entry, index) => (
              <article key={entry.id} className="bpp-submitted__card">
                <div className="bpp-submitted__meta">
                  <span className="bpp-pill">{entry.day}</span>
                  <span className="bpp-submitted__timestamp">
                    {new Date(entry.submittedAt).toLocaleString()}
                  </span>
                </div>

                <p className="bpp-submitted__note" aria-label="Entry label">
                  Entry #{entries.length - index}
                </p>

                <div className="bpp-submitted__content">
                  <div className="bpp-submitted__block">
                    <div className="bpp-submitted__label">
                      What did you work on today?
                    </div>
                    <div className="bpp-submitted__text">
                      {entry.workDone ? (
                        <pre className="bpp-pre">{entry.workDone}</pre>
                      ) : (
                        <span className="bpp-muted">No details provided.</span>
                      )}
                    </div>
                  </div>

                  <div className="bpp-submitted__block">
                    <div className="bpp-submitted__label">Issues faced</div>
                    <div className="bpp-submitted__text">
                      {entry.issuesFaced ? (
                        <pre className="bpp-pre">{entry.issuesFaced}</pre>
                      ) : (
                        <span className="bpp-muted">No issues listed.</span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default DailyUpdate;

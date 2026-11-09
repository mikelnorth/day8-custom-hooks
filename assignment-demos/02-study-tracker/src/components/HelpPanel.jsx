import useToggle from "../hooks/useToggle";

function HelpPanel() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <section className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="help-content"
        className="font-medium text-indigo-700 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isOpen ? "Hide help" : "How does this work?"}
      </button>

      {isOpen && (
        <div id="help-content" className="mt-3 space-y-2 text-sm text-stone-700">
          <p>
            A <strong>Pomodoro</strong> is one 25-minute study session. Press
            &ldquo;+1 Pomodoro&rdquo; each time you finish one. A subject is
            complete when it reaches its goal.
          </p>
          <p>
            Use &ldquo;+5 min&rdquo; to log extra practice outside a full
            session.
          </p>
          <p>
            Your name and your study streak are saved in this browser, so they
            are still here after a refresh. Session counts start fresh each
            visit.
          </p>
          <p>
            <strong>Focus mode</strong> hides the sidebar so you only see your
            subjects.
          </p>
        </div>
      )}
    </section>
  );
}

export default HelpPanel;

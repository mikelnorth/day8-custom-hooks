function Header({ name, isFocusMode, onToggleFocusMode }) {
  const trimmedName = name.trim();
  const greeting = trimmedName
    ? `Welcome back, ${trimmedName}!`
    : "Welcome, student!";

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium tracking-wide text-indigo-600 uppercase">
          Study Tracker
        </p>
        <h1 className="mt-1 text-3xl font-bold text-stone-900">{greeting}</h1>
      </div>

      <button
        type="button"
        onClick={onToggleFocusMode}
        aria-pressed={isFocusMode}
        className={
          isFocusMode
            ? "rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            : "rounded-lg border border-stone-300 bg-white px-4 py-2 font-medium text-stone-800 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        }
      >
        {isFocusMode ? "Exit focus mode" : "Focus mode"}
      </button>
    </header>
  );
}

export default Header;

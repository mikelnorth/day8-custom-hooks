function NameForm({ name, onNameChange }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <h2 className="text-lg font-semibold text-stone-900">Your name</h2>
      <label htmlFor="student-name" className="mt-3 block text-sm text-stone-600">
        What should we call you?
      </label>
      <input
        id="student-name"
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="e.g. Jordan"
        autoComplete="given-name"
        className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
      />
      <p className="mt-2 text-xs text-stone-500">
        Saved as you type. Refresh the page and it stays.
      </p>
    </section>
  );
}

export default NameForm;

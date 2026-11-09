import Header from "./components/Header";
import HelpPanel from "./components/HelpPanel";
import SessionSummary from "./components/SessionSummary";
import SubjectCard from "./components/SubjectCard";
import NameForm from "./components/NameForm";
import StreakCard from "./components/StreakCard";
import useCounter from "./hooks/useCounter";
import useToggle from "./hooks/useToggle";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // The name is shown in the Header and edited in NameForm,
  // so App owns it and passes it down.
  const [name, setName] = useLocalStorage("study-tracker:name", "");

  // A second, separate useToggle (HelpPanel has its own).
  const [isFocusMode, toggleFocusMode] = useToggle(false);

  // Same hook called three times = three separate counts.
  // They live in App because the total below needs all three.
  const math = useCounter(0);
  const reading = useCounter(0);
  const coding = useCounter(0);

  const subjects = [
    { id: "math", name: "Math", goal: 4, accent: "bg-sky-500", counter: math },
    { id: "reading", name: "Reading", goal: 3, accent: "bg-amber-500", counter: reading },
    { id: "coding", name: "Coding", goal: 5, accent: "bg-emerald-500", counter: coding },
  ];

  // Derived during render, not stored in state.
  const totalSessions = math.count + reading.count + coding.count;
  const completedCount = subjects.filter(
    (subject) => subject.counter.count >= subject.goal
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Header
        name={name}
        isFocusMode={isFocusMode}
        onToggleFocusMode={toggleFocusMode}
      />

      <HelpPanel />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <main className={isFocusMode ? "lg:col-span-3" : "lg:col-span-2"}>
          <SessionSummary
            totalSessions={totalSessions}
            completedCount={completedCount}
            subjectCount={subjects.length}
          />

          <h2 className="mt-6 mb-3 text-lg font-semibold text-stone-800">
            Subjects
          </h2>
          <div
            className={
              isFocusMode
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "grid gap-4 sm:grid-cols-2"
            }
          >
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                name={subject.name}
                goal={subject.goal}
                accent={subject.accent}
                counter={subject.counter}
              />
            ))}
          </div>
        </main>

        {!isFocusMode && (
          <aside className="flex flex-col gap-6">
            <NameForm name={name} onNameChange={setName} />
            <StreakCard />
          </aside>
        )}
      </div>
    </div>
  );
}

export default App;

// WE DO: plan the Productivity Panel before anyone builds it. Answers show on the page as you save.

const plan = {
  behaviors: `TODO: what are the three behaviors?`,
  hooks: `TODO: which hook handles each behavior? What does each one return?`,
  components: `TODO: which component calls which hook?`,
  shared: `TODO: does any state need to be shared between two components?`,
  eventOrEffect: `TODO: is saving to localStorage an event or an effect here? Why?`,
};

export default function App() {
  return (
    <div>
      <h1>Productivity Panel plan</h1>
      <h3>1. Behaviors</h3>
      <pre>{plan.behaviors}</pre>
      <h3>2. Hooks</h3>
      <pre>{plan.hooks}</pre>
      <h3>3. Components</h3>
      <pre>{plan.components}</pre>
      <h3>4. Shared state?</h3>
      <pre>{plan.shared}</pre>
      <h3>5. Event or effect?</h3>
      <pre>{plan.eventOrEffect}</pre>
    </div>
  );
}

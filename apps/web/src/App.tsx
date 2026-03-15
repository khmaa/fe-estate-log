import { Button } from "@shared-ui/core";

function App() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-3xl flex-col gap-8 rounded-[28px] border border-border bg-surface p-8 shadow-soft backdrop-blur">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Shared UI
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Base Button Preview
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            The shared button now uses the project Tailwind preset and can be previewed from
            the web app and Storybook with the same visual baseline.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={() => alert("clicked")}>Shared Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button className="bg-secondary text-secondary-foreground ring-1 ring-border hover:bg-secondary-hover">
            Secondary Button
          </Button>
        </div>
      </section>
    </main>
  );
}

export default App;

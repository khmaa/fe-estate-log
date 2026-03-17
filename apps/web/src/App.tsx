import { Button, Input, Label, Textarea } from "@shared-ui/core";

function App() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-4xl flex-col gap-8 rounded-[28px] border border-border bg-surface p-8 shadow-soft backdrop-blur">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Shared UI
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Form Foundations Preview
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            The shared UI package now includes form primitives that use the same token system in
            the web app and Storybook.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email address</Label>
              <Input id="contact-email" type="email" placeholder="hello@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                placeholder="Tell us what you want to build with this design system."
              />
            </div>
          </div>
          <div className="rounded-ui border border-border bg-background p-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Actions
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button onClick={() => alert("clicked")}>Send Message</Button>
                <Button variant="secondary">Save Draft</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

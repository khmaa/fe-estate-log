import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CheckboxField,
  Field,
  Input,
  Textarea,
} from "@shared-ui/core";

function App() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-4xl flex-col gap-8">
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Shared UI
            </p>
            <CardTitle>Form Foundations Preview</CardTitle>
            <CardDescription className="max-w-2xl">
              The shared UI package now includes layout and form primitives that
              use the same token system in the web app and Storybook.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <Field
                htmlFor="contact-email"
                label="Email address"
                helperText="We will only use this email for replies."
              >
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="hello@example.com"
                />
              </Field>
              <Field
                htmlFor="contact-message"
                label="Message"
                helperText="Tell us what you want to build with this design system."
              >
                <Textarea
                  id="contact-message"
                  placeholder="Share more context about your request."
                />
              </Field>
              <CheckboxField
                id="contact-updates"
                label="Email me updates about new shared UI components"
                helperText="You can unsubscribe from these product updates at any time."
              />
            </div>
            <div className="rounded-ui border border-border bg-background p-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Actions
                </p>
                <CardFooter className="justify-start">
                  <Button onClick={() => alert("clicked")}>Send Message</Button>
                  <Button variant="secondary">Save Draft</Button>
                  <Button variant="ghost">Cancel</Button>
                </CardFooter>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default App;

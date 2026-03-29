import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Banner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CheckboxField,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Field,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  Select,
  Spinner,
  Switch,
  Textarea,
  ToastHostProvider,
  useToast,
} from "@shared-ui/core";

const contactOptions = [
  { label: "Email", value: "email", description: "Best for async updates." },
  { label: "Phone", value: "phone", description: "For urgent follow-ups." },
  { label: "Chat", value: "chat", description: "Fast product feedback." },
];

const propertyOptions = [
  { label: "Apartment", value: "apartment" },
  { label: "Office", value: "office" },
  { label: "Retail", value: "retail" },
];

const ShowcaseContent = () => {
  const [contactMethod, setContactMethod] = useState("email");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { showToast } = useToast();

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Shared UI</Badge>
              <Badge variant="secondary">Day 14 Showcase</Badge>
              <Badge variant="success">17 Components</Badge>
            </div>
            <CardTitle>Shared UI Showcase</CardTitle>
            <CardDescription className="max-w-3xl">
              Token-based primitives for forms, feedback, overlays, and layout
              patterns. This page groups the current component set into a single
              preview surface for the web app.
            </CardDescription>
          </CardHeader>
        </Card>

        <Banner
          title="Showcase preview mode"
          description="Use this page to review component combinations before wiring them into real product screens."
          variant="info"
          action={<Button variant="secondary">View Storybook</Button>}
        />

        <section className="grid gap-8 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Form Controls
              </p>
              <CardTitle>Text and field primitives</CardTitle>
              <CardDescription>
                Input, textarea, select, and field composition on top of the
                shared token system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field
                htmlFor="showcase-email"
                label="Email address"
                helperText="We use this email for async design system updates."
              >
                <Input
                  id="showcase-email"
                  type="email"
                  placeholder="hello@example.com"
                />
              </Field>
              <Field
                htmlFor="showcase-message"
                label="Message"
                helperText="Describe the workflow you want to prototype next."
              >
                <Textarea
                  id="showcase-message"
                  placeholder="Share more context about the screen or form you want to build."
                />
              </Field>
              <Field
                htmlFor="showcase-property-type"
                label="Property type"
                helperText="Native select stays close to platform behavior."
              >
                <Select id="showcase-property-type" defaultValue="apartment">
                  {propertyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Selection Controls
              </p>
              <CardTitle>Choice and preference inputs</CardTitle>
              <CardDescription>
                Checkbox, radio, and switch patterns for product settings and
                communication preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CheckboxField
                id="showcase-updates"
                label="Email me component release notes"
                helperText="You can unsubscribe whenever the design system stabilizes."
              />
              <RadioGroup
                label="Preferred contact method"
                helperText="Radio groups work well when all options should stay visible."
                name="preferred-contact-method"
                value={contactMethod}
                onValueChange={setContactMethod}
                options={contactOptions}
              />
              <div className="flex items-start justify-between gap-4 rounded-ui border border-border bg-background px-4 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Release notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Toggle digest emails for new shared-ui updates.
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onChange={(event) =>
                    setNotificationsEnabled(event.currentTarget.checked)
                  }
                  aria-label="Enable release notifications"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Feedback
              </p>
              <CardTitle>Alerts, banners, and status labels</CardTitle>
              <CardDescription>
                Short-lived and persistent feedback patterns using the same
                semantic color tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="success">
                <AlertTitle>Changes published</AlertTitle>
                <AlertDescription>
                  Shared UI feedback components now share the same semantic
                  token palette across Storybook and the web app.
                </AlertDescription>
              </Alert>
              <Alert variant="error">
                <AlertTitle>Validation error</AlertTitle>
                <AlertDescription>
                  At least one required field is missing. Use error messaging
                  close to the input and a summary at the top when needed.
                </AlertDescription>
              </Alert>
              <div className="flex flex-wrap gap-3">
                <Badge>Draft</Badge>
                <Badge variant="secondary">In Review</Badge>
                <Badge variant="success">Published</Badge>
                <Badge variant="warning">Needs Attention</Badge>
                <Badge variant="error">Blocked</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 rounded-ui border border-border bg-background px-4 py-4">
                <Button loading>Saving changes</Button>
                <Button variant="secondary" loading>
                  Publishing
                </Button>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Spinner size="sm" />
                  Background sync in progress
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Overlay & Toast
              </p>
              <CardTitle>Layered interaction patterns</CardTitle>
              <CardDescription>
                Dialog and toast now share the app-level showcase surface rather
                than living only in isolated Storybook stories.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open dialog preview</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a new visit log</DialogTitle>
                    <DialogDescription>
                      Review the shared modal structure before you wire it into
                      a real workflow.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <Field
                      htmlFor="dialog-title"
                      label="Title"
                      helperText="Keep the modal body focused on one short task."
                    >
                      <Input
                        id="dialog-title"
                        placeholder="e.g. Gangnam apartment revisit"
                      />
                    </Field>
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button variant="secondary">Save draft</Button>
                    <Button>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="rounded-ui border border-border bg-background px-4 py-4">
                <p className="text-sm font-semibold text-foreground">
                  Toast preview
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use toasts for transient success or failure signals after an
                  action completes.
                </p>
                <div className="mt-4">
                  <Button
                    onClick={() =>
                      showToast({
                        title: "Preview saved",
                        description:
                          "Your showcase preferences were saved for the current session.",
                        variant: "success",
                      })
                    }
                  >
                    Show success toast
                  </Button>
                </div>
              </div>

              <div className="rounded-ui border border-border bg-background px-4 py-4">
                <p className="text-sm font-semibold text-foreground">
                  Dropdown menu preview
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use menus for grouped actions rather than value selection.
                </p>
                <div className="mt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary">Open actions menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Visit log actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit draft</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-danger focus:bg-danger-soft/50">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="rounded-ui border border-border bg-background px-4 py-4">
                <p className="text-sm font-semibold text-foreground">
                  Popover preview
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use popovers for contextual panels that need richer content
                  than a simple menu.
                </p>
                <div className="mt-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary">Open filter popover</Button>
                    </PopoverTrigger>
                    <PopoverContent align="end">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">
                            Quick filters
                          </p>
                          <p className="text-sm leading-6 text-muted-foreground">
                            Keep lightweight settings near the trigger instead
                            of opening a full dialog.
                          </p>
                        </div>
                        <div className="rounded-ui border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                          Apartments, under 1B KRW, and 10 minutes from transit
                        </div>
                        <div className="flex justify-end gap-3">
                          <PopoverClose asChild>
                            <Button variant="ghost">Close</Button>
                          </PopoverClose>
                          <Button>Apply filters</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Empty States
            </p>
            <CardTitle>No-data product states</CardTitle>
            <CardDescription>
              Empty states explain why a surface is blank and suggest the next
              action instead of leaving the user with an empty shell.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              badge="No Saved Visits"
              title="No visit logs yet"
              description="Start by creating the first property visit note. This is where your shared-ui primitives begin to feel like a product."
              action={<Button>Add first visit log</Button>}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export function ShowcasePage() {
  return (
    <ToastHostProvider>
      <ShowcaseContent />
    </ToastHostProvider>
  );
}

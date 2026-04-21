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
} from '@shared-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const contactOptions = [
  { label: 'Email', value: 'email', description: 'Best for async updates.' },
  { label: 'Phone', value: 'phone', description: 'For urgent follow-ups.' },
  { label: 'Chat', value: 'chat', description: 'Fast product feedback.' },
];

const propertyOptions = [
  { label: 'Apartment', value: 'apartment' },
  { label: 'Office', value: 'office' },
  { label: 'Retail', value: 'retail' },
];

const ShowcaseContent = () => {
  const [contactMethod, setContactMethod] = useState('email');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { showToast } = useToast();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{t('showcase.badges.sharedUi')}</Badge>
              <Badge variant="secondary">{t('showcase.badges.preview')}</Badge>
              <Badge variant="success">{t('showcase.badges.components')}</Badge>
            </div>
            <CardTitle>{t('showcase.hero.title')}</CardTitle>
            <CardDescription className="max-w-3xl">
              {t('showcase.hero.description')}
            </CardDescription>
          </CardHeader>
        </Card>

        <Banner
          title={t('showcase.banner.title')}
          description={t('showcase.banner.description')}
          variant="info"
          action={
            <Button variant="secondary">{t('showcase.banner.action')}</Button>
          }
        />

        <section className="grid gap-8 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {t('showcase.sections.form.eyebrow')}
              </p>
              <CardTitle>{t('showcase.sections.form.title')}</CardTitle>
              <CardDescription>
                {t('showcase.sections.form.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field
                htmlFor="showcase-email"
                label={t('showcase.form.email.label')}
                helperText={t('showcase.form.email.helper')}
              >
                <Input
                  id="showcase-email"
                  type="email"
                  placeholder={t('showcase.form.email.placeholder')}
                />
              </Field>
              <Field
                htmlFor="showcase-message"
                label={t('showcase.form.message.label')}
                helperText={t('showcase.form.message.helper')}
              >
                <Textarea
                  id="showcase-message"
                  placeholder={t('showcase.form.message.placeholder')}
                />
              </Field>
              <Field
                htmlFor="showcase-property-type"
                label={t('showcase.form.propertyType.label')}
                helperText={t('showcase.form.propertyType.helper')}
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
                {t('showcase.sections.selection.eyebrow')}
              </p>
              <CardTitle>{t('showcase.sections.selection.title')}</CardTitle>
              <CardDescription>
                {t('showcase.sections.selection.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CheckboxField
                id="showcase-updates"
                label={t('showcase.selection.checkbox.label')}
                helperText={t('showcase.selection.checkbox.helper')}
              />
              <RadioGroup
                label={t('showcase.selection.radio.label')}
                helperText={t('showcase.selection.radio.helper')}
                name="preferred-contact-method"
                value={contactMethod}
                onValueChange={setContactMethod}
                options={contactOptions}
              />
              <div className="flex items-start justify-between gap-4 rounded-ui border border-border bg-background px-4 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {t('showcase.selection.switch.title')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('showcase.selection.switch.description')}
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onChange={(event) =>
                    setNotificationsEnabled(event.currentTarget.checked)
                  }
                  aria-label={t('showcase.selection.switch.ariaLabel')}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {t('showcase.sections.feedback.eyebrow')}
              </p>
              <CardTitle>{t('showcase.sections.feedback.title')}</CardTitle>
              <CardDescription>
                {t('showcase.sections.feedback.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="success">
                <AlertTitle>{t('showcase.feedback.success.title')}</AlertTitle>
                <AlertDescription>
                  {t('showcase.feedback.success.description')}
                </AlertDescription>
              </Alert>
              <Alert variant="error">
                <AlertTitle>{t('showcase.feedback.error.title')}</AlertTitle>
                <AlertDescription>
                  {t('showcase.feedback.error.description')}
                </AlertDescription>
              </Alert>
              <div className="flex flex-wrap gap-3">
                <Badge>{t('showcase.feedback.badges.draft')}</Badge>
                <Badge variant="secondary">
                  {t('showcase.feedback.badges.inReview')}
                </Badge>
                <Badge variant="success">
                  {t('showcase.feedback.badges.published')}
                </Badge>
                <Badge variant="warning">
                  {t('showcase.feedback.badges.needsAttention')}
                </Badge>
                <Badge variant="error">
                  {t('showcase.feedback.badges.blocked')}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 rounded-ui border border-border bg-background px-4 py-4">
                <Button loading>{t('showcase.feedback.loading.saving')}</Button>
                <Button variant="secondary" loading>
                  {t('showcase.feedback.loading.publishing')}
                </Button>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Spinner size="sm" />
                  {t('showcase.feedback.loading.backgroundSync')}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {t('showcase.sections.overlay.eyebrow')}
              </p>
              <CardTitle>{t('showcase.sections.overlay.title')}</CardTitle>
              <CardDescription>
                {t('showcase.sections.overlay.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>{t('showcase.overlay.dialog.trigger')}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {t('showcase.overlay.dialog.title')}
                    </DialogTitle>
                    <DialogDescription>
                      {t('showcase.overlay.dialog.description')}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <Field
                      htmlFor="dialog-title"
                      label={t('showcase.overlay.dialog.field.label')}
                      helperText={t('showcase.overlay.dialog.field.helper')}
                    >
                      <Input
                        id="dialog-title"
                        placeholder={t(
                          'showcase.overlay.dialog.field.placeholder',
                        )}
                      />
                    </Field>
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">
                        {t('showcase.overlay.dialog.cancel')}
                      </Button>
                    </DialogClose>
                    <Button variant="secondary">
                      {t('showcase.overlay.dialog.saveDraft')}
                    </Button>
                    <Button>{t('showcase.overlay.dialog.create')}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="rounded-ui border border-border bg-background px-4 py-4">
                <p className="text-sm font-semibold text-foreground">
                  {t('showcase.overlay.toast.title')}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('showcase.overlay.toast.description')}
                </p>
                <div className="mt-4">
                  <Button
                    onClick={() =>
                      showToast({
                        title: t('showcase.overlay.toast.toastTitle'),
                        description: t(
                          'showcase.overlay.toast.toastDescription',
                        ),
                        variant: 'success',
                      })
                    }
                  >
                    {t('showcase.overlay.toast.action')}
                  </Button>
                </div>
              </div>

              <div className="rounded-ui border border-border bg-background px-4 py-4">
                <p className="text-sm font-semibold text-foreground">
                  {t('showcase.overlay.menu.title')}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('showcase.overlay.menu.description')}
                </p>
                <div className="mt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary">
                        {t('showcase.overlay.menu.trigger')}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        {t('showcase.overlay.menu.label')}
                      </DropdownMenuLabel>
                      <DropdownMenuItem>
                        {t('showcase.overlay.menu.items.editDraft')}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {t('showcase.overlay.menu.items.duplicate')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {t('showcase.overlay.menu.items.archive')}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-danger focus:bg-danger-soft/50">
                        {t('showcase.overlay.menu.items.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="rounded-ui border border-border bg-background px-4 py-4">
                <p className="text-sm font-semibold text-foreground">
                  {t('showcase.overlay.popover.title')}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('showcase.overlay.popover.description')}
                </p>
                <div className="mt-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary">
                        {t('showcase.overlay.popover.trigger')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">
                            {t('showcase.overlay.popover.panelTitle')}
                          </p>
                          <p className="text-sm leading-6 text-muted-foreground">
                            {t('showcase.overlay.popover.panelDescription')}
                          </p>
                        </div>
                        <div className="rounded-ui border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                          {t('showcase.overlay.popover.previewValue')}
                        </div>
                        <div className="flex justify-end gap-3">
                          <PopoverClose asChild>
                            <Button variant="ghost">
                              {t('showcase.overlay.popover.close')}
                            </Button>
                          </PopoverClose>
                          <Button>{t('showcase.overlay.popover.apply')}</Button>
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
              {t('showcase.sections.empty.eyebrow')}
            </p>
            <CardTitle>{t('showcase.sections.empty.title')}</CardTitle>
            <CardDescription>
              {t('showcase.sections.empty.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              badge={t('showcase.empty.badge')}
              title={t('showcase.empty.title')}
              description={t('showcase.empty.description')}
              action={<Button>{t('showcase.empty.action')}</Button>}
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

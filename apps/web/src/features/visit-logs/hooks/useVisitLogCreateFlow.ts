import { useToast } from '@shared-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CreateVisitLogInput, VisitLog } from '../types/visitLog';

const getDuplicateVisitLogInput = (
  visitLog: VisitLog,
): CreateVisitLogInput => ({
  title: visitLog.title,
  district: visitLog.district,
  priceLabel: visitLog.priceLabel,
  propertyType: visitLog.propertyType,
  summary: visitLog.summary,
});

const useVisitLogCreateFlow = () => {
  const [createInitialValues, setCreateInitialValues] = useState<
    CreateVisitLogInput | undefined
  >();
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const openCreateDialog = () => {
    setCreateInitialValues(undefined);
    setCreateDialogOpen(true);
  };

  const openDuplicateDialog = (visitLog: VisitLog) => {
    setCreateInitialValues(getDuplicateVisitLogInput(visitLog));
    setCreateDialogOpen(true);
  };

  const handleCreateDialogOpenChange = (open: boolean) => {
    if (!open) {
      setCreateInitialValues(undefined);
    }
    setCreateDialogOpen(open);
  };

  const handleCreated = () => {
    const isDuplicateDraft = Boolean(createInitialValues);

    setCreateInitialValues(undefined);
    setCreateDialogOpen(false);
    showToast({
      title: t(
        isDuplicateDraft
          ? 'visitLogs.page.toast.duplicate.title'
          : 'visitLogs.page.toast.title',
      ),
      description: t(
        isDuplicateDraft
          ? 'visitLogs.page.toast.duplicate.description'
          : 'visitLogs.page.toast.description',
      ),
      variant: 'success',
    });
  };

  return {
    createInitialValues,
    handleCreated,
    handleCreateDialogOpenChange,
    isCreateDialogOpen,
    openCreateDialog,
    openDuplicateDialog,
  };
};

export { getDuplicateVisitLogInput, useVisitLogCreateFlow };

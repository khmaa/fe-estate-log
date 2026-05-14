import { useToast } from '@shared-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useVisitLogCreateFlow = () => {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const openCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCreated = () => {
    setCreateDialogOpen(false);
    showToast({
      title: t('visitLogs.page.toast.title'),
      description: t('visitLogs.page.toast.description'),
      variant: 'success',
    });
  };

  return {
    handleCreated,
    isCreateDialogOpen,
    openCreateDialog,
    setCreateDialogOpen,
  };
};

export { useVisitLogCreateFlow };

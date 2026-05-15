import { useToast } from '@shared-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { NavigateFunction } from 'react-router-dom';
import type { VisitLog } from '../types/visitLog';

type UseVisitLogDetailFlowParams = {
  navigate: NavigateFunction;
  returnPath: string;
};

const useVisitLogDetailFlow = ({
  navigate,
  returnPath,
}: UseVisitLogDetailFlowParams) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const openEditDialog = () => {
    setDeleteDialogOpen(false);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = () => {
    setEditDialogOpen(false);
    setDeleteDialogOpen(true);
  };

  const handleBack = () => {
    navigate(returnPath);
  };

  const handleUpdated = (updatedVisitLog: VisitLog) => {
    setEditDialogOpen(false);
    showToast({
      title: t('visitLogs.detail.toasts.updated.title'),
      description: t('visitLogs.detail.toasts.updated.description', {
        title: updatedVisitLog.title,
      }),
      variant: 'success',
    });
  };

  const handleDeleted = (deletedVisitLog: VisitLog) => {
    setDeleteDialogOpen(false);
    showToast({
      title: t('visitLogs.detail.toasts.deleted.title'),
      description: t('visitLogs.detail.toasts.deleted.description', {
        title: deletedVisitLog.title,
      }),
      variant: 'success',
    });
    navigate(returnPath, { replace: true });
  };

  return {
    handleBack,
    handleDeleted,
    handleUpdated,
    isActionDisabled: isEditDialogOpen || isDeleteDialogOpen,
    isDeleteDialogOpen,
    isEditDialogOpen,
    openDeleteDialog,
    openEditDialog,
    setDeleteDialogOpen,
    setEditDialogOpen,
  };
};

export { useVisitLogDetailFlow };

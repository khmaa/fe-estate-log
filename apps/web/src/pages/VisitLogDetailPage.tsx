import { useToast } from '@shared-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { VisitLogDeleteDialog } from '../features/visit-logs/components/VisitLogDeleteDialog';
import { VisitLogDetailScreen } from '../features/visit-logs/components/VisitLogDetailScreen';
import { VisitLogEditDialog } from '../features/visit-logs/components/VisitLogEditDialog';
import { useVisitLogDetail } from '../features/visit-logs/hooks/useVisitLogDetail';

const VisitLogDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { visitLogId } = useParams();
  const { errorType, isError, isLoading, log } = useVisitLogDetail(visitLogId);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const returnPath = `/visit-logs${location.search}`;

  const handleBack = () => {
    navigate(returnPath);
  };

  const handleEditConfirm = () => {
    setIsEditDialogOpen(false);
    showToast({
      title: t('visitLogs.detail.toasts.updated.title'),
      description: t('visitLogs.detail.toasts.updated.description'),
      variant: 'success',
    });
  };

  const handleDeleteConfirm = () => {
    setIsDeleteDialogOpen(false);
    showToast({
      title: t('visitLogs.detail.toasts.deleted.title'),
      description: t('visitLogs.detail.toasts.deleted.description'),
      variant: 'success',
    });
    navigate(returnPath);
  };

  return (
    <>
      <VisitLogDetailScreen
        errorType={errorType}
        isError={isError}
        log={log}
        isLoading={isLoading}
        onBack={handleBack}
        onEdit={() => setIsEditDialogOpen(true)}
        onDelete={() => setIsDeleteDialogOpen(true)}
      />

      <VisitLogEditDialog
        key={`${log?.id ?? 'empty'}-${isEditDialogOpen ? 'open' : 'closed'}`}
        log={log}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdated={handleEditConfirm}
      />

      <VisitLogDeleteDialog
        log={log}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDeleted={handleDeleteConfirm}
      />
    </>
  );
};

export { VisitLogDetailPage };

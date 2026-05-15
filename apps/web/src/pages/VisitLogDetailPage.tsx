import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { VisitLogDeleteDialog } from '../features/visit-logs/components/VisitLogDeleteDialog';
import { VisitLogDetailScreen } from '../features/visit-logs/components/VisitLogDetailScreen';
import { VisitLogEditDialog } from '../features/visit-logs/components/VisitLogEditDialog';
import { useVisitLogDetail } from '../features/visit-logs/hooks/useVisitLogDetail';
import { useVisitLogDetailFlow } from '../features/visit-logs/hooks/useVisitLogDetailFlow';

const VisitLogDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { visitLogId } = useParams();
  const { errorType, isError, isLoading, log } = useVisitLogDetail(visitLogId);
  const returnPath = `/visit-logs${location.search}`;
  const {
    handleBack,
    handleDeleted,
    handleUpdated,
    isActionDisabled,
    isDeleteDialogOpen,
    isEditDialogOpen,
    openDeleteDialog,
    openEditDialog,
    setDeleteDialogOpen,
    setEditDialogOpen,
  } = useVisitLogDetailFlow({ navigate, returnPath });

  return (
    <>
      <VisitLogDetailScreen
        errorType={errorType}
        isActionDisabled={isActionDisabled}
        isError={isError}
        log={log}
        isLoading={isLoading}
        onBack={handleBack}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      <VisitLogEditDialog
        key={`${log?.id ?? 'empty'}-${isEditDialogOpen ? 'open' : 'closed'}`}
        log={log}
        open={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdated={handleUpdated}
      />

      <VisitLogDeleteDialog
        log={log}
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDeleted={handleDeleted}
      />
    </>
  );
};

export { VisitLogDetailPage };

const deleteVisitLog = async (visitLogId: string): Promise<void> => {
  const response = await fetch(`/api/visit-logs/${visitLogId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete the visit log.');
  }
};

export { deleteVisitLog };

import { useEffect } from 'react';
import useCommunications from '../../core/hooks/useCommunications';
import NotificationAssignments from '../components/NotificationAssignments';

export default function ApprovedTasks() {
  const { assignmentsExpired, fetchAssignmentsExpired } = useCommunications();

  useEffect(() => {
    fetchAssignmentsExpired(new Date().toISOString());
  }, [fetchAssignmentsExpired]);

  return <NotificationAssignments title='Tarefas Expiradas' assignments={assignmentsExpired} />;
}

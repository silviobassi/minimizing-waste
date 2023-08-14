import { useCallback, useState } from 'react';
import { Communication } from '../../sdk/@types';
import { NotificationService } from '../../sdk/services';

export default function useCommunications() {
  const [availableSupplies, setAvailableSupplies] = useState<
    Communication.SupplyMovementNotification[]
  >([]);

  const [availableAssignedTasks, setAvailableAssignedTasks] = useState<
    Communication.AssignmentNotification[]
  >([]);

  const [availableUnassignedTasks, setAvailableUnassignedTasks] = useState<
  Communication.AssignmentNotification[]
>([]);

  const [assignmentsExpired, setAssignmentsExpired] = useState<
    Communication.AssignmentNotification[]
  >([]);

  const [assignmentsApproved, setAssignmentsApproved] = useState<
    Communication.AssignmentNotification[]
  >([]);

  const [assignmentsCompleted, setAssignmentsCompleted] = useState<
    Communication.AssignmentNotification[]
  >([]);

  const fetchAvailableSupplies = useCallback(async () => {
    await NotificationService.getAvailableSupplies().then(setAvailableSupplies);
  }, []);

  const fetchAvailableAssignedTasks = useCallback(async () => {
    await NotificationService.getAvailableAssignedTasks().then(
      setAvailableAssignedTasks,
    );
  }, []);

  const fetchAvailableUnassignedTasks = useCallback(async () => {
    await NotificationService.getAvailableUnassignedTasks().then(
      setAvailableUnassignedTasks,
    );
  }, []);

  const fetchAssignmentsExpired = useCallback(async (currentDate: string) => {
    await NotificationService.getAssignmentsExpired(currentDate).then(
      setAssignmentsExpired,
    );
  }, []);

  const fetchAssignmentsApproved = useCallback(async (approved = true) => {
    await NotificationService.getAssignmentsApproved(approved).then(
      setAssignmentsApproved,
    );
  }, []);

  const fetchAssignmentsCompleted = useCallback(async (completed = true) => {
    await NotificationService.getAssignmentsCompleted(completed).then(
      setAssignmentsCompleted,
    );
  }, []);

  return {
    fetchAvailableSupplies,
    fetchAvailableAssignedTasks,
    fetchAvailableUnassignedTasks,
    fetchAssignmentsExpired,
    fetchAssignmentsApproved,
    fetchAssignmentsCompleted,
    availableSupplies,
    availableAssignedTasks,
    availableUnassignedTasks,
    assignmentsExpired,
    assignmentsApproved,
    assignmentsCompleted,
  };
}

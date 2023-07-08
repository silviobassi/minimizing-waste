import { useCallback, useState } from 'react';
import { Communication } from '../../sdk/@types';
import { NotificationService } from '../../sdk/services';

export default function useCommunications() {
  const [availableSupplies, setAvailableSupplies] = useState<
    Communication.SupplyMovementNotification[]
  >([]);

  const [availableAssignments, setAvailableAssignments] = useState<
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

  const fetchAvailableAssignments = useCallback(async () => {
    await NotificationService.getAvailableAssignments().then(
      setAvailableAssignments,
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
    fetchAvailableAssignments,
    fetchAssignmentsExpired,
    fetchAssignmentsApproved,
    fetchAssignmentsCompleted,
    availableSupplies,
    availableAssignments,
    assignmentsExpired,
    assignmentsApproved,
    assignmentsCompleted,
  };
}

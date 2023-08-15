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

  const fetchAvailableSupplies = useCallback(async (page: number) => {
    await NotificationService.getAvailableSupplies({
      page: page,
      sort: ['asc'],
      size: 2
    }).then(setAvailableSupplies);
  }, []);

  const fetchAvailableAssignedTasks = useCallback(async (page: number) => {
    await NotificationService.getAvailableAssignedTasks({
      page: page,
      sort: ['asc'],
      size: 2,
      assign: 'assignedTasks'
    }).then(setAvailableAssignedTasks);
  }, []);

  const fetchAvailableUnassignedTasks = useCallback(async (page: number) => {
    await NotificationService.getAvailableUnassignedTasks({
      page: page,
      sort: ['asc'],
      size: 2,
      assign: 'unassignTasks'
    }).then(setAvailableUnassignedTasks);
  }, []);

  const fetchAssignmentsExpired = useCallback(
    async (page: number) => {
      await NotificationService.getAssignmentsExpired({
        page: page,
        sort: ['asc'],
        size: 2,
        currentDate: new Date().toISOString()
      }).then(setAssignmentsExpired);
    },
    [],
  );

  const fetchAssignmentsApproved = useCallback(
    async (page: number) => {
      await NotificationService.getAssignmentsApproved({
        page: page,
        sort: ['asc'],
        size: 2,
        approved: true
      }).then(setAssignmentsApproved);
    },
    [],
  );

  const fetchAssignmentsCompleted = useCallback(
    async (page: number) => {
      await NotificationService.getAssignmentsCompleted({
        page: page,
        sort: ['asc'],
        size: 2,
        completed: true
      }).then(setAssignmentsCompleted);
    },
    [],
  );

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

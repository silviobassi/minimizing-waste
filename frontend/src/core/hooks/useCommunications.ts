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

  const fetchAvailableSupplies = useCallback(async () => {
    await NotificationService.getAvailableSupplies().then(setAvailableSupplies);
  }, []);

  const fetchAvailableAssignments = useCallback(async () => {
    await NotificationService.getAvailableAssignments().then(
      setAvailableAssignments,
    );
  }, []);

  return {
    fetchAvailableSupplies,
    fetchAvailableAssignments,
    availableSupplies,
    availableAssignments,
  };
}

import { useCallback, useState } from 'react';
import { WorkStation } from '../../sdk/@types';
import { WorkStationService } from '../../sdk/services';

export default function useWorkStations() {
  const [workStations, setWorkStations] = useState<WorkStation.Collection[]>(
    [],
  );

  const fetchWorkStations = useCallback(() => {
    WorkStationService.getAllWorkStations().then(setWorkStations);
  }, []);

  return {
    fetchWorkStations,
    workStations,
  };
}

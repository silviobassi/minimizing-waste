import { useCallback, useState } from 'react';
import { WorkStation } from '../../@types/WorkStation';
import WorkStationService from '../../services/WorkStation.service';

export default function useWorkStations() {
  const [workStations, setWorkStations] = useState<WorkStation.Collection[]>([]);

  const fetchWorkStations = useCallback(() => {
    WorkStationService.getAllWorkStations().then(setWorkStations);
  }, []);

  return {
    fetchWorkStations,
    workStations,
  };
}

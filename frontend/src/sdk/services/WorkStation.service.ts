import { WorkStation } from '../@types/WorkStation';
import Service from '../Service';

class WorkStationService extends Service {
  static getAllWorkStations() {
    return this.Http.get<WorkStation.Collection>('/work-stations').then(this.getData);
  }

  static fetchWorkStations(workStationId: number) {
    return this.Http.get<WorkStation.WorkStationModel>(`/work-stations/${workStationId}`).then(
      this.getData,
    );
  }
}

export default WorkStationService;
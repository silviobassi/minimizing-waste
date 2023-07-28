import { WorkStation } from '../@types/WorkStation';
import Service from '../Service';
import { generateQueryString } from '../utils';

class WorkStationService extends Service {
  static getAllWorkStations(search: WorkStation.Query): WorkStation.Collection {
    const queryString = generateQueryString(search);
    return this.Http.get<WorkStation.Collection>(
      '/work-stations'.concat(queryString),
    ).then(this.getData);
  }

  static getWorkStation(workStationId: number) {
    return this.Http.get<WorkStation.WorkStationModel>(
      `/work-stations/${workStationId}`,
    ).then(this.getData);
  }

  static createWorkStation(WorkStation: WorkStation.Input) {
    return this.Http.post<WorkStation.WorkStationModel>(
      '/work-stations',
      WorkStation,
    ).then(this.getData);
  }

  static updateExistingWorkStation(
    WorkStation: WorkStation.Input,
    workStationId: number,
  ) {
    return this.Http.put<WorkStation.WorkStationModel>(
      `/work-stations/${workStationId}`,
      WorkStation,
    ).then(this.getData);
  }

  static deleteExistingWorkStation(workStationId: number) {
    return this.Http.delete(`/work-stations/${workStationId}`).then(
      this.getStatus,
    );
  }
}

export default WorkStationService;

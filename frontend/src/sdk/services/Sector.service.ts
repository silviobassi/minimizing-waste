import { Sector } from '../@types/Sector';
import Service from '../Service';
import { generateQueryString } from '../utils';

class SectorService extends Service {
  static getAllSectors(search: Sector.Query) {
    const queryString = generateQueryString(search);
    return this.Http.get<Sector.Collection>(
      '/sectors'.concat(queryString),
    ).then(this.getData);
  }

  static getSector(sectorId: number) {
    return this.Http.get<Sector.SectorModel>(`/sectors/${sectorId}`).then(
      this.getData,
    );
  }

  static createSector(sector: Sector.Input) {
    return this.Http.post<Sector.SectorModel>('/sectors', sector).then(
      this.getData,
    );
  }

  static updateExistingSector(sector: Sector.Input, sectorId: number) {
    return this.Http.put<Sector.SectorModel>(
      `/sectors/${sectorId}`,
      sector,
    ).then(this.getData);
  }

  static deleteExistingSector(sectorId: number) {
    return this.Http.delete(`/sectors/${sectorId}`).then(this.getStatus);
  }
}

export default SectorService;

import { Sector } from '../@types/Sector';
import Service from '../Service';

class SectorService extends Service {
  static getAllSectors() {
    return this.Http.get<Sector.Collection>('/sectors').then(this.getData);
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

import { Sector } from '../@types/Sector';
import Service from '../Service';

class SectorService extends Service {
  static getAllSectors() {
    return this.Http.get<Sector.Collection>('/sectors').then(this.getData);
  }

  static fetchSector(sectorId: number) {
    return this.Http.get<Sector.SectorModel>(`/sectors/${sectorId}`).then(
      this.getData,
    );
  }
}

export default SectorService;

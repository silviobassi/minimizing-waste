import { MinimizingWaste } from './MinimizingWaste';

export namespace Sector {
  export type Collection =
    MinimizingWaste.components['schemas']['CollectionModelSectorModel'];
  export type SectorModel =
    MinimizingWaste.components['schemas']['SectorModel'];
  export type Input = MinimizingWaste.components['schemas']['SectorInput'];

  export type Query = {
    sectorName?: string;
  };
}

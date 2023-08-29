import { MinimizingWaste } from './MinimizingWaste';

export namespace WorkStation {
  export type Collection =
    MinimizingWaste.components['schemas']['CollectionModelWorkStationModel'];
  export type WorkStationModel =
    MinimizingWaste.components['schemas']['WorkStationModel'];
  export type Input = MinimizingWaste.components['schemas']['SectorInput'];

  export type Query = {
    page?: number;
    size?: number;
    sort?: ['asc' | 'desc'];
    workStationName?: string | undefined
  };
}

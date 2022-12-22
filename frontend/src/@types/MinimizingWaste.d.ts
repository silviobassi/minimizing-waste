import React from 'react';

export namespace MinimizingWaste {
  interface SupplyDescription {
    measure: number;
    measureUnitType: string;
    packing: string;
    quantity: number;
    total: number;
  }

  interface SupplySummary {
    id: number;
    name: string;
    supplyDescription: SupplyDescription;
  }
}

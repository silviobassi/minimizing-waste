package com.dcconnect.minimizingwaste.domain.strategy;

import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;

public class WhenCreating implements SupplyCalculate {

    public void calculate(SupplyMovement supplyMovement) {
        var supply = supplyMovement.getSupply();
        supply.getSupplyDescription().setQuantity(supply.getSupplyDescription().getQuantity()
                - supplyMovement.getReservedQuantity());
    }

}

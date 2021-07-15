package com.dcconnect.minimizingwaste.domain.strategy;

import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;

public class WhenUpdating implements SupplyCalculate {

    public void calculate(SupplyMovement supplyMovement) {
        var supply = supplyMovement.getSupply();

        var currentQuantitySupply = supply.getSupplyDescription().getQuantity()
                + supplyMovement.getAllocatedQuantity() - supplyMovement.getReservedQuantity();


        supply.getSupplyDescription().setQuantity(currentQuantitySupply);
    }

}

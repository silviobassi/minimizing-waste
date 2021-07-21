package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.springframework.stereotype.Service;

@Service
public class GiveBackAllocatedSupplyServiceImpl {

    public static final String QUANTITY_RESERVED_GREATER_AVAILABLE = "A quantidade reservada (%d) não pode" +
            " ser maior do que quantidade disponível (%d)";

    public void whenCreating(SupplyMovement supplyMovement) {
        var supply = supplyMovement.getSupply();

        if (supplyMovement.getId() == null){
            if (supplyMovement.isAllocatedQuantityGreaterThanSupplyQuantity()) {
                throw new BusinessException(String.format(QUANTITY_RESERVED_GREATER_AVAILABLE,
                        supplyMovement.getReservedQuantity(),
                        supply.getSupplyDescription().getQuantity()));
            }

        supply.getSupplyDescription().setQuantity(
                supply.getSupplyDescription().getQuantity()
                        - supplyMovement.getReservedQuantity());
        }
    }

    public void whenUpdating(SupplyMovement supplyMovement) {
        var supply = supplyMovement.getSupply();

        if(supplyMovement.isReservedQuantityGreaterThanAllocatedQuantityAndSupplyQuantity()){
            throw new BusinessException(String.format(QUANTITY_RESERVED_GREATER_AVAILABLE,
                    supplyMovement.getReservedQuantity(),
                    supplyMovement.getSupply().getSupplyDescription().getQuantity()));
        }

      /* supply.getSupplyDescription().setQuantity(
                supply.getSupplyDescription().getQuantity()
                        + supplyMovement.getAllocatedQuantity() - supplyMovement.getReservedQuantity());*/

        supply.getSupplyDescription().setQuantity(supply.getSupplyDescription().getQuantity()
                - supplyMovement.getReservedQuantity());

    }

    public void whenDeleting(SupplyMovement supplyMovement){
        var supply = supplyMovement.getSupply();

        supply.getSupplyDescription().setQuantity(
                supply.getSupplyDescription().getQuantity()
                        + supplyMovement.getAllocatedQuantity());
    }

}

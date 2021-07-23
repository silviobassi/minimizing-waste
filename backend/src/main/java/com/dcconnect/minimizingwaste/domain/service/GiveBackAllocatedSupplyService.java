package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GiveBackAllocatedSupplyService {

    @Autowired
    private SupplyService supplyService;

    public static final String QUANTITY_RESERVED_GREATER_AVAILABLE = "A quantidade reservada (%d) não pode" +
            " ser maior do que quantidade disponível (%d)";

    public void whenCreatingMovement(SupplyMovement supplyMovement) {
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

    public void whenUpdatingMovement(SupplyMovement supplyMovement, Long supplyId) {
        var supply = supplyMovement.getSupply();

        if(supplyMovement.isReservedQuantityGreaterThanAvailableQuantity()){
            throw new BusinessException(String.format(QUANTITY_RESERVED_GREATER_AVAILABLE,
                    supplyMovement.getReservedQuantity(),
                    supplyMovement.getSupply().getSupplyDescription().getQuantity()));
        }

        if(!supplyMovement.getSupply().getId().equals(supplyId)){
            whenCreatingMovement(supplyMovement);
            return;
        }

        supply.getSupplyDescription().setQuantity(supply.getSupplyDescription().getQuantity()
                + supplyMovement.getAllocatedQuantity() - supplyMovement.getReservedQuantity());

    }

    public void whenReplaceSupply(SupplyMovement currentSupplyMovement, Long supplyId) {
        var supply = currentSupplyMovement.getSupply();

        if(!currentSupplyMovement.getSupply().getId().equals(supplyId)){
            supply.getSupplyDescription().setQuantity(currentSupplyMovement.getAllocatedQuantity() +
                    supply.getSupplyDescription().getQuantity());
            currentSupplyMovement.setAllocatedQuantity(0L);

        }
    }

    public void whenDeleting(SupplyMovement supplyMovement){
        var supply = supplyMovement.getSupply();

        supply.getSupplyDescription().setQuantity(
                supply.getSupplyDescription().getQuantity()
                        + supplyMovement.getAllocatedQuantity());
    }

}

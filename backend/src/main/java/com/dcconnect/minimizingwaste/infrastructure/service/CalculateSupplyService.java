package com.dcconnect.minimizingwaste.infrastructure.service;

import com.dcconnect.minimizingwaste.domain.service.CalculateService;
import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.springframework.stereotype.Service;

@Service
public class CalculateSupplyService implements CalculateService {

    public static final String QUANTITY_RESERVED_GREATER_AVAILABLE = "A quantidade reservada (%d) não pode" +
            " ser maior do que quantidade disponível (%d)";

    public void whenCreatingMovement(SupplyMovement supplyMovement) {
        var supply = supplyMovement.getSupply();
        var supplyMovementReservedQuantity = supplyMovement.getReservedQuantity();
        var supplyQuantity = supply.getSupplyDescription().getQuantity();

        if (supplyMovement.isAllocatedQuantityGreaterThanSupplyQuantity()) {
            throw new BusinessException(String.format(QUANTITY_RESERVED_GREATER_AVAILABLE,
                    supplyMovementReservedQuantity, supplyQuantity));
        }

        supply.getSupplyDescription().setQuantity(supplyQuantity - supplyMovementReservedQuantity);

    }

    public void whenUpdatingMovement(SupplyMovement supplyMovement, Long supplyId) {

        var supply = supplyMovement.getSupply();
        var supplyMovementReservedQuantity = supplyMovement.getReservedQuantity();
        var supplyQuantity = supplyMovement.getSupply().getSupplyDescription().getQuantity();

        if(supplyMovement.isReservedQuantityGreaterThanAvailableQuantity()){
            throw new BusinessException(String.format(QUANTITY_RESERVED_GREATER_AVAILABLE,
                    supplyMovementReservedQuantity, supplyQuantity));
        }

        if(!supplyMovement.getSupply().getId().equals(supplyId)){
            whenCreatingMovement(supplyMovement);
            return;
        }

        supplyMovement.getAllocatedQuantity();
        supplyMovement.getReservedQuantity();
        supply.getSupplyDescription().getQuantity();

        supply.getSupplyDescription().setQuantity(supply.getSupplyDescription().getQuantity()
                + supplyMovement.getAllocatedQuantity() - supplyMovementReservedQuantity);

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

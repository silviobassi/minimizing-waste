package com.dcconnect.minimizingwaste.domain.strategy;

import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;

public class WhenDeleting implements SupplyCalculate {

    private SupplyRepository supplyRepository;

    @Transactional
    public void calculate(SupplyMovement supplyMovement) {
        var supply = supplyMovement.getSupply();

        supply.getSupplyDescription().setQuantity(
                supply.getSupplyDescription().getQuantity() + supplyMovement.getAllocatedQuantity());

    }

}

package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SuppliesMovementDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyMovement toDomainObject(SupplyMovementInput supplyMovementInput) {
        return modelMapper.map(supplyMovementInput, SupplyMovement.class);
    }

    public void copyToDomainModel(SupplyMovementInput supplyMovementInput, SupplyMovement supplyMovement) {
        //identifier of an instance of com.dcconnect.minimizingwaste.domain.model.EstacaoTrabalho
        //was altered from 2 to 3
        supplyMovement.setWorkStation(new WorkStation());
        supplyMovement.setSupply(new Supply());

        modelMapper.map(supplyMovementInput, supplyMovement);
    }
}

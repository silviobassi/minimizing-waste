package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.ReturnedSupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DevolvedSupplyMovementDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyMovement toDomainObject(ReturnedSupplyMovementInput returnedSupplyMovementInput) {
        return modelMapper.map(returnedSupplyMovementInput, SupplyMovement.class);
    }

    public void copyToDomainModel(ReturnedSupplyMovementInput returnedSupplyMovementInput,
                                  SupplyMovement supplyMovement) {
        modelMapper.map(returnedSupplyMovementInput, supplyMovement);
    }

}

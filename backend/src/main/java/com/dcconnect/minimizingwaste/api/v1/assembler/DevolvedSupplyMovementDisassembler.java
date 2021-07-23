package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.DevolvedSupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DevolvedSupplyMovementDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyMovement toDomainObject(DevolvedSupplyMovementInput devolvedSupplyMovementInput) {
        return modelMapper.map(devolvedSupplyMovementInput, SupplyMovement.class);
    }

    public void copyToDomainModel(DevolvedSupplyMovementInput devolvedSupplyMovementInput,
                                  SupplyMovement supplyMovement) {
        modelMapper.map(devolvedSupplyMovementInput, supplyMovement);
    }

}

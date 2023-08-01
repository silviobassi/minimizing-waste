package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMaterialInput;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SupplyMaterialDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Supply toDomainObject(SupplyMaterialInput supplyMaterialInput) {
        return modelMapper.map(supplyMaterialInput, Supply.class);
    }

    public void copyToDomainModel(SupplyMaterialInput supplyMaterialInput, Supply supply) {

        modelMapper.map(supplyMaterialInput, supply);
    }

}

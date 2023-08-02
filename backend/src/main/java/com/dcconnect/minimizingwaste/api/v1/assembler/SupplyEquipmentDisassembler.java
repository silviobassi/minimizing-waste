package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyEquipmentInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMaterialInput;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SupplyEquipmentDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Supply toDomainObject(SupplyEquipmentInput supplyEquipmentInput) {
        return modelMapper.map(supplyEquipmentInput, Supply.class);
    }

    public void copyToDomainModel(SupplyEquipmentInput supplyEquipmentInput, Supply supply) {
        modelMapper.map(supplyEquipmentInput, supply);
    }

}

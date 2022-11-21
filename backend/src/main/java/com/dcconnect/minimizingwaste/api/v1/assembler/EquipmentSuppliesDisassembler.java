package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyEquipmentInput;
import com.dcconnect.minimizingwaste.domain.model.Equipment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EquipmentSuppliesDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Equipment toDomainObject(SupplyEquipmentInput supplyEquipmentInput) {
        return modelMapper.map(supplyEquipmentInput, Equipment.class);
    }

    public void copyToDomainModel(SupplyEquipmentInput supplyEquipmentInput, Equipment equipment) {
        modelMapper.map(supplyEquipmentInput, equipment);
    }

}

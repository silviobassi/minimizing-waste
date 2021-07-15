package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.EquipmentSupplyInput;
import com.dcconnect.minimizingwaste.domain.model.Equipment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EquipmentSuppliesDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Equipment toDomainObject(EquipmentSupplyInput equipmentSupplyInput) {
        return modelMapper.map(equipmentSupplyInput, Equipment.class);
    }

    public void copyToDomainModel(EquipmentSupplyInput equipmentSupplyInput, Equipment equipment) {
        modelMapper.map(equipmentSupplyInput, equipment);
    }

}

package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.EquipmentModelSupplyModel;
import com.dcconnect.minimizingwaste.domain.model.Equipment;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EquipmentSuppliesAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public EquipmentModelSupplyModel toModel(Supply supply) {
        return modelMapper.map(supply, EquipmentModelSupplyModel.class);
    }

    public List<EquipmentModelSupplyModel> toCollectionModel(List<Equipment> equipment) {
        return equipment.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

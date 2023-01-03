package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.EquipmentSupplyModel;
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

    public EquipmentSupplyModel toModel(Supply supply) {
        return modelMapper.map(supply, EquipmentSupplyModel.class);
    }

    public List<EquipmentSupplyModel> toCollectionModel(List<Equipment> equipment) {
        return equipment.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.EquipmentSupplySupplyModel;
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

    public EquipmentSupplySupplyModel toModel(Supply supply) {
        return modelMapper.map(supply, EquipmentSupplySupplyModel.class);
    }

    public List<EquipmentSupplySupplyModel> toCollectionModel(List<Equipment> equipment) {
        return equipment.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

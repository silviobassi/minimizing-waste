package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.MaterialSupplySupplyModelModel;
import com.dcconnect.minimizingwaste.domain.model.Material;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MaterialSupplyAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public MaterialSupplySupplyModelModel toModel(Supply supply){
        return modelMapper.map(supply, MaterialSupplySupplyModelModel.class);
    }

    public List<MaterialSupplySupplyModelModel> toCollectionModel(List<Material> materials){
        return materials.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

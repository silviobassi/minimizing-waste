package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMaterialInput;
import com.dcconnect.minimizingwaste.domain.model.Material;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MaterialSupplyDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Material toDomainObject(SupplyMaterialInput recursoMaterialInput) {
        return modelMapper.map(recursoMaterialInput, Material.class);
    }

    public void copyToDomainModel(SupplyMaterialInput recursoMaterialInput, Material material) {
        modelMapper.map(recursoMaterialInput, material);
    }

}

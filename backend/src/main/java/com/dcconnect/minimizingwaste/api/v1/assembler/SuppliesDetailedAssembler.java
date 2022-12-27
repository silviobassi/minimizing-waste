package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SuppliesDetailedAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyDetailedModel toModel(Supply supply){
        return modelMapper.map(supply, SupplyDetailedModel.class);
    }

    public List<SupplyDetailedModel> toCollectionModel(List<Supply> supplies){
        return supplies.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

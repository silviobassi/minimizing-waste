package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyModel;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SuppliesAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyModel toModel(Supply supply){
        return modelMapper.map(supply, SupplyModel.class);
    }

    public List<SupplyModel> toCollectionModel(List<Supply> supplies){
        return supplies.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

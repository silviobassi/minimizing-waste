package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.SupplySummaryModel;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SuppliesSummaryAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public SupplySummaryModel toModel(Supply supply){
        return modelMapper.map(supply, SupplySummaryModel.class);
    }

    public List<SupplySummaryModel> toCollectionModel(List<Supply> supplies){
        return supplies.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SupplyMovementAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyMovementModel toModel(SupplyMovement supplyMovement){
        return modelMapper.map(supplyMovement, SupplyMovementModel.class);
    }

    public List<SupplyMovementModel> toCollectionModel(List<SupplyMovement> movimentosRecursos){
        return movimentosRecursos.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

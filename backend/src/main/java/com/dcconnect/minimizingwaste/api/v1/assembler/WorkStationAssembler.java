package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.WorkStationModel;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class WorkStationAssembler {


    @Autowired
    private ModelMapper modelMapper;

    public WorkStationModel toModel(WorkStation workStation){
        return modelMapper.map(workStation, WorkStationModel.class);
    }

    public List<WorkStationModel> toCollectionModel(List<WorkStation> estacoesTrabalho){
        return estacoesTrabalho.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

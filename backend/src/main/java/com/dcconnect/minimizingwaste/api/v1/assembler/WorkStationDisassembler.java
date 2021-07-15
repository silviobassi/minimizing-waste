package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationInput;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WorkStationDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public WorkStation toDomainObject(WorkStationInput workStationInput) {
        return modelMapper.map(workStationInput, WorkStation.class);
    }

    public void copyToDomainModel(WorkStationInput workStationInput, WorkStation workStation) {
        modelMapper.map(workStationInput, workStation);
    }
}

package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AssignmentDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Assignment toDomainObject(Object objectInput) {
        return modelMapper.map(objectInput, Assignment.class);
    }

    public void copyToDomainModel(Object objectInput, Assignment assignment) {
        modelMapper.map(objectInput, assignment);
    }

}

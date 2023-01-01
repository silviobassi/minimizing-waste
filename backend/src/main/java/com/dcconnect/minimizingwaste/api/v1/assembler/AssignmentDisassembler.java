package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentInput;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class AssignmentDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Assignment toDomainObject(AssignmentInput assignmentInput) {
        return modelMapper.map(assignmentInput, Assignment.class);
    }

    public void copyToDomainModel(AssignmentInput assignmentInput, Assignment assignment) {
        modelMapper.map(assignmentInput, assignment);
    }

}
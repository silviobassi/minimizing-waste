package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentNotificationInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AssignmentNotificationDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Assignment toDomainObject(AssignmentNotificationInput assignmentNotificationInput) {
        return modelMapper.map(assignmentNotificationInput, Assignment.class);
    }

    public void copyToDomainModel(AssignmentNotificationInput assignmentNotificationInput, Assignment assignment) {
        modelMapper.map(assignmentNotificationInput, assignment);
    }
}

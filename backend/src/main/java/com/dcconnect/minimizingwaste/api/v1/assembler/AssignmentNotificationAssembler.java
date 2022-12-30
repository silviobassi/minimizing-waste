package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.AssignmentNotificationModel;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AssignmentNotificationAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public AssignmentNotificationModel toModel(Assignment assignment){
        return modelMapper.map(assignment, AssignmentNotificationModel
                .class);
    }

    public List<AssignmentNotificationModel> toCollectionModel(List<Assignment> assignments){
        return assignments.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

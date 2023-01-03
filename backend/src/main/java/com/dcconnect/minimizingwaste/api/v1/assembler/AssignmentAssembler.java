package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AssignmentController;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentModel;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Component
public class AssignmentAssembler extends RepresentationModelAssemblerSupport<Assignment, AssignmentModel> {

    @Autowired
    private ModelMapper modelMapper;

    public AssignmentAssembler() {
        super(AssignmentController.class, AssignmentModel.class);
    }

    public AssignmentModel toModel(Assignment assignment){
        AssignmentModel assignmentModel = createModelWithId(assignment.getId(), assignment);
        modelMapper.map(assignment, assignmentModel);
        return assignmentModel;
    }

    public CollectionModel<AssignmentModel> toCollectionModel(Iterable <? extends Assignment> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(AssignmentController.class).withSelfRel());
    }

}

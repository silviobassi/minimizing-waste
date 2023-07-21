package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AssignmentController;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentDefaultModel;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Component
public class AssignmentDefaultAssembler extends RepresentationModelAssemblerSupport<Assignment, AssignmentDefaultModel> {

    @Autowired
    private ModelMapper modelMapper;

    public AssignmentDefaultAssembler() {
        super(AssignmentController.class, AssignmentDefaultModel.class);
    }

    public AssignmentDefaultModel toModel(Assignment assignment){
        AssignmentDefaultModel assignmentModel = createModelWithId(assignment.getId(), assignment);
        modelMapper.map(assignment, assignmentModel);
        return assignmentModel;
    }

    public CollectionModel<AssignmentDefaultModel> toCollectionModel(Iterable <? extends Assignment> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(AssignmentController.class).withSelfRel());
    }

}

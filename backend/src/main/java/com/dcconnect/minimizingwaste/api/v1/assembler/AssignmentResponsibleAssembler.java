package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AssignmentController;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentResponsibleModel;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Component
public class AssignmentResponsibleAssembler extends RepresentationModelAssemblerSupport<Assignment, AssignmentResponsibleModel> {

    @Autowired
    private ModelMapper modelMapper;

    public AssignmentResponsibleAssembler() {
        super(AssignmentController.class, AssignmentResponsibleModel.class);
    }

    @Override
    public AssignmentResponsibleModel toModel(Assignment assignment){
        AssignmentResponsibleModel assignmentResponsibleModel = new AssignmentResponsibleModel();

        modelMapper.map(assignment, assignmentResponsibleModel);

        return  assignmentResponsibleModel;
    }

    public CollectionModel<AssignmentResponsibleModel> toCollectionModel(
            Iterable<? extends Assignment> entities){

        return super.toCollectionModel(entities)
                .add(linkTo(AssignmentController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}

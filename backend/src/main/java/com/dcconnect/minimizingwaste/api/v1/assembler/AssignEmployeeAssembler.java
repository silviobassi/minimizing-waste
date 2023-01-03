package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AssignmentController;
import com.dcconnect.minimizingwaste.api.v1.controller.AssignmentEmployeeController;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentNotificationInput;
import com.dcconnect.minimizingwaste.domain.model.User;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Affordance;
import org.springframework.hateoas.AffordanceModel;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.mediatype.Affordances;
import org.springframework.hateoas.mediatype.ConfigurableAffordance;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class AssignEmployeeAssembler extends RepresentationModelAssemblerSupport<User, UserDetailedModel> {

    @Autowired
    private ModelMapper modelMapper;

    @Getter
    @Setter
    private Long assignmentId;

    public AssignEmployeeAssembler() {
        super(AssignmentController.class, UserDetailedModel.class);
    }

    public UserDetailedModel toModel(User user){
        UserDetailedModel userDetailedModel = new UserDetailedModel();
        
        userDetailedModel.add(linkTo(methodOn(AssignmentEmployeeController.class)
                .detachEmployee(getAssignmentId(), user.getId(), null))
                .withRel("detach-employee"));

        modelMapper.map(user, userDetailedModel);

        return  userDetailedModel;
    }

    public CollectionModel<UserDetailedModel> toCollectionModel(
            Iterable<? extends User> entities, Long assignmentId){

        setAssignmentId(assignmentId);
        return super.toCollectionModel(entities)
                .add(linkTo(methodOn(AssignmentEmployeeController.class)
                        .all(getAssignmentId())).withSelfRel());
    }

}

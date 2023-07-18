package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.UserController;
import com.dcconnect.minimizingwaste.api.v1.model.UserAssignmentModel;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Component
public class UserAssignmentAssembler extends RepresentationModelAssemblerSupport<User, UserAssignmentModel> {

    @Autowired
    private ModelMapper modelMapper;

    public UserAssignmentAssembler() {
        super(UserController.class, UserAssignmentModel.class);
    }

    public UserAssignmentModel toModel(User user){
        UserAssignmentModel userAssignmentModel = createModelWithId(user.getId(), user);
        modelMapper.map(user, userAssignmentModel);


        return userAssignmentModel;
    }

    public CollectionModel<UserAssignmentModel> toCollectionModel(Iterable<? extends User> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(UserController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}

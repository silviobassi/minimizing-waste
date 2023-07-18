package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.UserController;
import com.dcconnect.minimizingwaste.api.v1.model.UserAssignedModel;
import com.dcconnect.minimizingwaste.domain.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Component
public class UserAssignmentAssembler extends RepresentationModelAssemblerSupport<User, UserAssignedModel> {

    @Autowired
    private ModelMapper modelMapper;

    public UserAssignmentAssembler() {
        super(UserController.class, UserAssignedModel.class);
    }

    public UserAssignedModel toModel(User user){
        UserAssignedModel userAssignedModel = createModelWithId(user.getId(), user);
        modelMapper.map(user, userAssignedModel);


        return userAssignedModel;
    }

    public CollectionModel<UserAssignedModel> toCollectionModel(Iterable<? extends User> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(UserController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}

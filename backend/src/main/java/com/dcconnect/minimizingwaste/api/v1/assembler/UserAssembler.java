package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.UserController;
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
public class UserAssembler extends RepresentationModelAssemblerSupport<User, UserDetailedModel> {

    @Autowired
    private ModelMapper modelMapper;

    public UserAssembler() {
        super(UserController.class, UserDetailedModel.class);
    }

    public UserDetailedModel toModel(User user){
        UserDetailedModel userDetailedModel = createModelWithId(user.getId(), user);
        modelMapper.map(user, userDetailedModel);

        return userDetailedModel;
    }

    public CollectionModel<UserDetailedModel> toCollectionModel(Iterable<? extends User> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(UserController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}

package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.UserController;
import com.dcconnect.minimizingwaste.api.v1.model.UserSummaryModel;
import com.dcconnect.minimizingwaste.domain.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Component
public class UserSummaryAssembler extends RepresentationModelAssemblerSupport<User, UserSummaryModel> {

    @Autowired
    private ModelMapper modelMapper;

    public UserSummaryAssembler() {
        super(UserController.class, UserSummaryModel.class);
    }

    public UserSummaryModel toModel(User user){
        UserSummaryModel userSummaryModel = createModelWithId(user.getId(), user);
        modelMapper.map(user, userSummaryModel);
        return userSummaryModel;
    }

    public CollectionModel<UserSummaryModel> toCollectionModel(Iterable<? extends User> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(UserController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}

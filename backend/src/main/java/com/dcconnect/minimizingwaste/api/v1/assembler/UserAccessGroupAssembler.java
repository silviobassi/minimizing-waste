package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.UserRoleController;
import com.dcconnect.minimizingwaste.api.v1.model.RoleDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.Role;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class UserAccessGroupAssembler extends RepresentationModelAssemblerSupport<Role, RoleDetailedModel> {

    @Autowired
    private ModelMapper modelMapper;

    @Getter
    @Setter
    private Long userId;

    public UserAccessGroupAssembler() {
        super(UserRoleController.class, RoleDetailedModel.class);
    }

    public RoleDetailedModel toModel(Role role){

        RoleDetailedModel roleDetailedModel = new RoleDetailedModel();

        roleDetailedModel.add(linkTo(methodOn(UserRoleController.class)
                .associate(getUserId(), role.getId())).withRel("disassociate"));

        modelMapper.map(role, roleDetailedModel);

        return roleDetailedModel;
    }

    public CollectionModel<RoleDetailedModel> toCollectionModel(
            Iterable<? extends Role> entities,
            Long userId){

        setUserId(userId);
        return super.toCollectionModel(entities)
                .add(linkTo(methodOn(UserRoleController.class).all(getUserId())).withSelfRel());
    }



}

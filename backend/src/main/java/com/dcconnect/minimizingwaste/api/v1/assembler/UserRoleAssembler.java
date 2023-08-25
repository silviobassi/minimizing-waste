package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.SectorController;
import com.dcconnect.minimizingwaste.api.v1.controller.UserRoleController;
import com.dcconnect.minimizingwaste.api.v1.model.RoleDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.RoleSummaryModel;
import com.dcconnect.minimizingwaste.domain.model.Role;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class UserRoleAssembler extends RepresentationModelAssemblerSupport<Role, RoleSummaryModel> {

    @Autowired
    private ModelMapper modelMapper;

    @Getter
    @Setter
    private Long userId;

    public UserRoleAssembler() {
        super(UserRoleController.class, RoleSummaryModel.class);
    }

    public RoleSummaryModel toModel(Role role){

        RoleSummaryModel roleSummaryModel = new RoleSummaryModel();

        modelMapper.map(role, roleSummaryModel);

        return roleSummaryModel;
    }

    public CollectionModel<RoleSummaryModel> toCollectionModel(
            Iterable<? extends Role> entities
            ){

        return super.toCollectionModel(entities)
                .add(linkTo(SectorController.class).withRel(IanaLinkRelations.SELF.value()));
    }



}

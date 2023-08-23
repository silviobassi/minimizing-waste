package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.RolePermissionController;
import com.dcconnect.minimizingwaste.api.v1.controller.PermissionController;
import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.PermissionRepository;
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
public class PermissionAssembler extends RepresentationModelAssemblerSupport<Permission, PermissionDetailedModel> {

    @Autowired
    private ModelMapper modelMapper;

    @Getter
    @Setter
    private Long roleId;

    public PermissionAssembler() {
        super(PermissionController.class, PermissionDetailedModel.class);
    }

    public PermissionDetailedModel toModel(Permission permission){
        PermissionDetailedModel permissionDetailedModel = new PermissionDetailedModel();

        permissionDetailedModel.add(linkTo(methodOn(RolePermissionController.class)
                .all(getRoleId())).withRel(IanaLinkRelations.SELF.value()));

        modelMapper.map(permission, permissionDetailedModel);

        return permissionDetailedModel;
    }

    public CollectionModel<PermissionDetailedModel> toCollectionModel(
            Iterable<? extends Permission> entities, Long roleId){
        setRoleId(roleId);
        return super.toCollectionModel(entities)
                .add(linkTo(PermissionController.class).withSelfRel());
    }

}

package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AccessGroupPermissionController;
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
    private final PermissionRepository permissionRepository;
    @Getter
    @Setter
    private Long accessGroupId;

    public PermissionAssembler(PermissionRepository permissionRepository) {
        super(PermissionController.class, PermissionDetailedModel.class);
        this.permissionRepository = permissionRepository;
    }

    public PermissionDetailedModel toModel(Permission permission){
        PermissionDetailedModel permissionDetailedModel = new PermissionDetailedModel();

        permissionDetailedModel.add(linkTo(methodOn(AccessGroupPermissionController.class)
                .all(this.accessGroupId)).withRel(IanaLinkRelations.SELF.value()));

        modelMapper.map(permission, permissionDetailedModel);

        return permissionDetailedModel;
    }

    public CollectionModel<PermissionDetailedModel> toCollectionModel(
            Iterable<? extends Permission> entities, Long accessGroupId){
        setAccessGroupId(accessGroupId);
        return super.toCollectionModel(entities)
                .add(linkTo(PermissionController.class).withSelfRel());
    }

}

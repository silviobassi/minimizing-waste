package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.PermissionAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.AccessGroupPermissionControllerOpenApi;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.repository.AccessGroupRepository;
import com.dcconnect.minimizingwaste.domain.service.AccessGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/v1/access-groups/{accessGroupId}/permissions")
public class AccessGroupPermissionController implements AccessGroupPermissionControllerOpenApi {

    @Autowired
    private AccessGroupService accessGroupService;

    @Autowired
    private PermissionAssembler permissionAssembler;
    @Autowired
    private AccessGroupRepository accessGroupRepository;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<PermissionDetailedModel> all(@PathVariable Long accessGroupId){
        AccessGroup accessGroup =  accessGroupService.findOrFail(accessGroupId);
        CollectionModel<PermissionDetailedModel> permissionsDetailed = permissionAssembler
                .toCollectionModel(accessGroup.getPermissions(), accessGroupId);
        return permissionsDetailed;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{permissionId}")
    public ResponseEntity<Void> disassociate(@PathVariable Long accessGroupId, @PathVariable Long permissionId) {
        accessGroupService.disassociatePermission(accessGroupId, permissionId);
        return ResponseEntity.noContent().build();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{permissionId}")
    public void associate(@PathVariable Long accessGroupId, @PathVariable Long permissionId){
        accessGroupService.associatePermission(accessGroupId, permissionId);
    }

}

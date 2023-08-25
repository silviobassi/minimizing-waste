package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.PermissionAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.RolePermissionControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Role;
import com.dcconnect.minimizingwaste.domain.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
@RequestMapping("/v1/roles/{roleId}/permissions")
public class RolePermissionController implements RolePermissionControllerOpenApi {

    @Autowired
    private RoleService roleService;

    @Autowired
    private PermissionAssembler permissionAssembler;

    @CheckSecurity.RolesPermissions.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<PermissionDetailedModel> all(@PathVariable Long roleId){
        Role role =  roleService.findOrFail(roleId);
        CollectionModel<PermissionDetailedModel> permissionsDetailed = permissionAssembler
                .toCollectionModel(role.getPermissions(), roleId);
        return permissionsDetailed;
    }

    @CheckSecurity.RolesPermissions.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{permissionId}")
    public ResponseEntity<Void> disassociate(@PathVariable Long roleId, @PathVariable Long permissionId) {
        roleService.disassociatePermission(roleId, permissionId);
        return ResponseEntity.noContent().build();
    }

    @CheckSecurity.RolesPermissions.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{permissionId}")
    public void associate(@PathVariable Long roleId, @PathVariable Long permissionId){
        roleService.associatePermission(roleId, permissionId);
    }

}

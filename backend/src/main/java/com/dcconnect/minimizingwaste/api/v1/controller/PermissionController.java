package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.PermissionAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.PermissionControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.PermissionRepository;
import com.dcconnect.minimizingwaste.domain.service.PermissionService;
import com.dcconnect.minimizingwaste.domain.service.RolePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/roles/permissions")
public class PermissionController implements PermissionControllerOpenApi {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RolePermissionService rolePermissionService;

    @Autowired
    private PermissionAssembler permissionAssembler;

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<PermissionDetailedModel> all(){
        List<Permission> permissions = permissionRepository.findAll();
        return permissionAssembler.toCollectionModel(permissions);
    }

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{roleId}")
    public CollectionModel<PermissionDetailedModel> allNotGranted(@PathVariable Long roleId){
        List<Permission> permissions = rolePermissionService.findAllNotGranted(roleId);
        return permissionAssembler.toCollectionModel(permissions);
    }

}

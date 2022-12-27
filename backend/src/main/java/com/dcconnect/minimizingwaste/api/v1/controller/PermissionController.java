package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.PermissionAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/permissions")
public class PermissionController {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private PermissionAssembler permissionAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<PermissionDetailedModel> all(){
        List<Permission> permissions = permissionRepository.findAll();
        return permissionAssembler.toCollectionModel(permissions);
    }

}

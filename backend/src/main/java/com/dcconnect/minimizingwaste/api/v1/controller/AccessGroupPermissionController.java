package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.PermissionAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailed;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.service.AccessGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/access-groups/{accessGroupId}/permissions")
public class AccessGroupPermissionController {

    @Autowired
    private AccessGroupService accessGroupService;

    @Autowired
    private PermissionAssembler permissionAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<PermissionDetailed> all(@PathVariable Long accessGroupId){
        AccessGroup accessGroup =  accessGroupService.findOrFail(accessGroupId);
        List<PermissionDetailed> permissionsDetailed = permissionAssembler
                .toCollectionModel(accessGroup.getPermissions());
        return permissionsDetailed;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{permissionId}")
    public void disassociate(@PathVariable Long accessGroupId, @PathVariable Long permissionId) {
        accessGroupService.disassociatePermission(accessGroupId, permissionId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{permissionId}")
    public void associate(@PathVariable Long accessGroupId, @PathVariable Long permissionId){
        accessGroupService.associatePermission(accessGroupId, permissionId);
    }

}

package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserRoleAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.RoleSummaryModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.UserRoleControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.service.UserRoleService;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users/{userId}/roles")
public class UserRoleController implements UserRoleControllerOpenApi {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoleAssembler userRoleAssembler;

    @Autowired
    private UserRoleService userRoleService;

    @CheckSecurity.RolesPermissions.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<RoleSummaryModel> allNotOrGranted(@PathVariable Long userId,
                                                             @RequestParam(required = false, defaultValue = "granted") String role){

        if(role.equals("granted")){
            return userRoleAssembler.toCollectionModel(userRoleService.findAllGranted(userId));
        }

        if(role.equals("notGranted")){
            return userRoleAssembler.toCollectionModel(userRoleService.findAllNotGranted(userId));
        }

        return userRoleAssembler.toCollectionModel(userRoleService.findAllGranted(userId));
    }



    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{roleId}")
    public ResponseEntity<Void> disassociate(@PathVariable Long userId, @PathVariable Long roleId){
        userService.disassociateRole(userId, roleId);
        return ResponseEntity.noContent().build();
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{roleId}")
    public ResponseEntity<Void> associate(@PathVariable Long userId, @PathVariable Long roleId){
        userService.associateRole(userId, roleId);
        return ResponseEntity.noContent().build();
    }
}
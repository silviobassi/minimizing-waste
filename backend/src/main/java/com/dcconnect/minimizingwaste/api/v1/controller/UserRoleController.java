package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserAccessGroupAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.RoleDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.UserRoleControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users/{userId}/roles")
public class UserRoleController implements UserRoleControllerOpenApi {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAccessGroupAssembler userAccessGroupAssembler;

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public RoleDetailedModel all(@PathVariable Long userId){
        User user = userService.findOrFail(userId);

        return userAccessGroupAssembler.toModel(user.getRole());
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{roleId}")
    public ResponseEntity<Void> disassociate(@PathVariable Long userId, @PathVariable Long roleId){
        userService.disassociateAccessGroup(userId, roleId);
        return ResponseEntity.noContent().build();
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{roleId}")
    public ResponseEntity<Void> associate(@PathVariable Long userId, @PathVariable Long roleId){
        userService.associateAccessGroup(userId, roleId);
        return ResponseEntity.noContent().build();
    }
}
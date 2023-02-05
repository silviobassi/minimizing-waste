package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserAccessGroupAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummaryModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.UserAccessGroupControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users/{userId}/access-groups")
public class UserAccessGroupController implements UserAccessGroupControllerOpenApi {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAccessGroupAssembler userAccessGroupAssembler;

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<AccessGroupSummaryModel> all(@PathVariable Long userId){
        User user = userService.findOrFail(userId);

        return userAccessGroupAssembler.toCollectionModel(user.getAccessGroups(), userId);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{accessGroupId}")
    public ResponseEntity<Void> disassociate(@PathVariable Long userId, @PathVariable Long accessGroupId){
        userService.disassociateAccessGroup(userId, accessGroupId);
        return ResponseEntity.noContent().build();
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{accessGroupId}")
    public ResponseEntity<Void> associate(@PathVariable Long userId, @PathVariable Long accessGroupId){
        userService.associateAccessGroup(userId, accessGroupId);
        return ResponseEntity.noContent().build();
    }
}
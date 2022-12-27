package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AccessGroupAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummaryModel;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/users/{userId}/access-groups")
public class UserAccessGroupController {

    @Autowired
    private UserService userService;

    @Autowired
    private AccessGroupAssembler accessGroupAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<AccessGroupSummaryModel> all(@PathVariable Long userId){
        User user = userService.findOrFail(userId);

        return accessGroupAssembler.toCollectionModel(user.getAccessGroups());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{accessGroupId}")
    public void disassociate(@PathVariable Long userId, @PathVariable Long accessGroupId){
        userService.disassociateAccessGroup(userId, accessGroupId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{accessGroupId}")
    public void associate(@PathVariable Long userId, @PathVariable Long accessGroupId){
        userService.associateAccessGroup(userId, accessGroupId);
    }
}
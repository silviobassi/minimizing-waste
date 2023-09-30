package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserAssignmentAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.UserAssignedModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.UserAssignmentAssignedControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import com.dcconnect.minimizingwaste.domain.service.AssignmentService;
import com.dcconnect.minimizingwaste.infrastructure.spec.UserSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users/{assignmentId}")
public class UserAssignmentAssignedController implements UserAssignmentAssignedControllerOpenApi {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserAssignmentAssembler userAssignmentAssembler;

    @Autowired
    private PagedResourcesAssembler<User> pagedResourcesAssembler;

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/assignments")
    public PagedModel<UserAssignedModel> allAssigned(@PageableDefault(size = 10) Pageable pageable,
                                                                     @RequestParam Boolean assigned,
                                                                     @PathVariable Long assignmentId){
        assignmentService.findOrFail(assignmentId);
        Page<User> usersPage;

        if(!assigned){
            usersPage = userRepository.findAll(UserSpecs.userUnassignedAssignmentId(assignmentId), pageable);
            return pagedResourcesAssembler.toModel(usersPage, userAssignmentAssembler);
       }

        usersPage = userRepository.findAll(UserSpecs.userAssignedAssignmentId(assignmentId), pageable);
        return pagedResourcesAssembler.toModel(usersPage, userAssignmentAssembler);

    }

}

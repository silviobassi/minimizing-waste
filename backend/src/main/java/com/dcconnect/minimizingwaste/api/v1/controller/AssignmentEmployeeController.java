package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/assignments/{assignmentId}/employee-responsible")
public class AssignmentEmployeeController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserAssembler userAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<UserDetailedModel> all(@PathVariable Long assignmentId){
        Assignment assignment = assignmentService.findOrFail(assignmentId);

        List<User> users = assignment.getEmployeeResponsible().stream().collect(Collectors.toList());

        return userAssembler.toCollectionModel(users);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{employeeResponsibleId}")
    public void attachEmployee(@PathVariable Long assignmentId, @PathVariable Long employeeResponsibleId){
        assignmentService.attachEmployee(assignmentId, employeeResponsibleId);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{employeeResponsibleId}")
    public void detachEmployee(@PathVariable Long assignmentId, @PathVariable Long employeeResponsibleId){
        assignmentService.detachEmployee(assignmentId, employeeResponsibleId);
    }

}

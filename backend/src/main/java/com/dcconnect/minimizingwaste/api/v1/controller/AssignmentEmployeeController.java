package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AssignEmployeeAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentNotificationDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentNotificationInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.AssignmentEmployeeControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.service.AssignmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/assignments/{assignmentId}/employee-responsible")
public class AssignmentEmployeeController implements AssignmentEmployeeControllerOpenApi {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private AssignEmployeeAssembler assignEmployeeAssembler;

    @CheckSecurity.Assignments.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<UserDetailedModel> all(@PathVariable Long assignmentId){
        Assignment assignment = assignmentService.findOrFail(assignmentId);
        List<User> users = new ArrayList<>(assignment.getEmployeesResponsible());
        return assignEmployeeAssembler.toCollectionModel(users, assignmentId);
    }

    @CheckSecurity.Assignments.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{employeeResponsibleId}/associate")
    public ResponseEntity<Void> attachEmployee(@PathVariable Long assignmentId,
                        @PathVariable Long employeeResponsibleId){
        Assignment currentAssignment = assignmentService.findOrFail(assignmentId);
        assignmentService.attachEmployee(employeeResponsibleId, currentAssignment);
        return ResponseEntity.noContent().build();
    }

    @CheckSecurity.Assignments.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{employeeResponsibleId}/disassociate")
    public ResponseEntity<Void> detachEmployee(@PathVariable Long assignmentId,
                                               @PathVariable Long employeeResponsibleId){
        Assignment currentAssignment = assignmentService.findOrFail(assignmentId);
        assignmentService.detachEmployee(employeeResponsibleId, currentAssignment);

        return ResponseEntity.noContent().build();
    }

}

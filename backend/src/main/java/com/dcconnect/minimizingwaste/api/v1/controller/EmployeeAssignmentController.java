package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentResponsibleAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentResponsibleModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.EmployeeAssignmentControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.ResponsibleFilter;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import com.dcconnect.minimizingwaste.infrastructure.spec.ResponsibleSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/assignments/responsible")
public class EmployeeAssignmentController implements EmployeeAssignmentControllerOpenApi {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentResponsibleAssembler assignmentResponsibleAssembler;

    @CheckSecurity.Assignments.CanConsultResponsible
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<AssignmentResponsibleModel> search(ResponsibleFilter responsibleFilter) {
        List<Assignment> assignments = assignmentRepository
                .findAll(ResponsibleSpecs.usingFilter(responsibleFilter));
        return assignmentResponsibleAssembler.toCollectionModel(assignments);
    }
}

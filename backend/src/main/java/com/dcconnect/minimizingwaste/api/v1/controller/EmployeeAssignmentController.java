package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentResponsibleAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentResponsibleModel;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.EmployeeAssignmentControllerOpenApi;
import com.dcconnect.minimizingwaste.core.data.PageWrapper;
import com.dcconnect.minimizingwaste.core.data.PageableTranslator;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.ResponsibleFilter;
import com.dcconnect.minimizingwaste.domain.repository.filter.UserFilter;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import com.dcconnect.minimizingwaste.infrastructure.spec.ResponsibleSpecs;
import com.dcconnect.minimizingwaste.infrastructure.spec.UserSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/assignments/responsible")
public class EmployeeAssignmentController implements EmployeeAssignmentControllerOpenApi {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentResponsibleAssembler assignmentResponsibleAssembler;

    @Autowired
    private PagedResourcesAssembler<Assignment> pagedResourcesAssembler;

    @CheckSecurity.Assignments.CanConsultResponsible
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PagedModel<AssignmentResponsibleModel> search(ResponsibleFilter responsibleFilter, Pageable pageable) {

        Pageable translatedPageable = pageableTranslate((pageable));
        Page<Assignment> assignmentsPage = assignmentRepository
                .findAll(ResponsibleSpecs.usingFilter(responsibleFilter), translatedPageable);

        assignmentsPage = new PageWrapper<>(assignmentsPage, pageable);
        return pagedResourcesAssembler.toModel(assignmentsPage, assignmentResponsibleAssembler);
    }

    private Pageable pageableTranslate(Pageable apiPageable) {
        var mapping = Map.of(
                "name", "name",
                "cpf", "cpf"
        );

        return PageableTranslator.translate(apiPageable, mapping);
    }
}

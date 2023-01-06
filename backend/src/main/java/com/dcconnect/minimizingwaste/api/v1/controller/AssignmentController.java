package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.AssignmentControllerOpenApi;
import com.dcconnect.minimizingwaste.core.data.PageWrapper;
import com.dcconnect.minimizingwaste.core.data.PageableTranslator;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentFilter;
import com.dcconnect.minimizingwaste.domain.service.AssignmentService;
import com.dcconnect.minimizingwaste.infrastructure.spec.AssignmentSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/v1/assignments")
public class AssignmentController implements AssignmentControllerOpenApi {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentAssembler assignmentAssembler;

    @Autowired
    private AssignmentDisassembler assignmentDisassembler;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private PagedResourcesAssembler<Assignment> pagedResourcesAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<AssignmentModel> search(AssignmentFilter assignmentFilter,
                                                   @PageableDefault(size = 10) Pageable pageable){

        Pageable translatedPage = pageableTranslate(pageable);

        Page<Assignment> assignmentsPage = assignmentRepository.findAll(
                AssignmentSpecs.usingFilter(assignmentFilter), translatedPage);

        assignmentsPage = new PageWrapper<>(assignmentsPage, pageable);

        return pagedResourcesAssembler.toModel(assignmentsPage, assignmentAssembler);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AssignmentModel create(@RequestBody @Valid AssignmentInput assignmentInput){
        Assignment assignment = assignmentDisassembler.toDomainObject(assignmentInput);
        assignment = assignmentService.create(assignment);
        return assignmentAssembler.toModel(assignment);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{assignmentId}")
    public AssignmentModel update(@PathVariable Long assignmentId, @RequestBody @Valid AssignmentInput assignmentInput){
        Assignment assignment =  assignmentService.findOrFail(assignmentId);
        assignmentDisassembler.copyToDomainModel(assignmentInput, assignment);
        assignment = assignmentService.create(assignment);

        return assignmentAssembler.toModel(assignment);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{assignmentId}")
    public void delete(@PathVariable Long assignmentId){
        assignmentService.delete(assignmentId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{assignmentId}")
    public AssignmentModel findOrFail(@PathVariable Long assignmentId){
        Assignment assignment = assignmentService.findOrFail(assignmentId);

        return assignmentAssembler.toModel(assignment);
    }
    private Pageable pageableTranslate(Pageable apiPageable){
        var mapping = Map.of(
                "title", "title",
                "startDate", "startDate",
                "endDate", "endDate",
                "deadline", "deadline",
                "completed", "completed",
                "approved", "approved"
        );

        return PageableTranslator.translate(apiPageable, mapping);
    }

}

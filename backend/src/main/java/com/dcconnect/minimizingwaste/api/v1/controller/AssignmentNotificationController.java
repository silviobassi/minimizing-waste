package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentNotificationAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentNotificationModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.AssignmentNotificationControllerOpenApi;
import com.dcconnect.minimizingwaste.core.data.PageWrapper;
import com.dcconnect.minimizingwaste.core.data.PageableTranslator;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentNotificationFilter;
import com.dcconnect.minimizingwaste.infrastructure.spec.AssignmentNotificationSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/notifications/assignments")
public class AssignmentNotificationController implements AssignmentNotificationControllerOpenApi {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentNotificationAssembler assignmentNotificationAssembler;

    @Autowired
    private PagedResourcesAssembler<Assignment> pagedResourcesAssembler;

    @CheckSecurity.Notifications.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/available")
    public PagedModel<AssignmentNotificationModel> search(AssignmentNotificationFilter assignmentNotificationFilter,
                                                          @PageableDefault(size = 2) Pageable pageable){
       Pageable translatedPage = pageableTranslate(pageable);

       Page<Assignment> assignmentPage = assignmentRepository
               .findAll(AssignmentNotificationSpecs.usingFilter(assignmentNotificationFilter), translatedPage);

       assignmentPage = new PageWrapper<>(assignmentPage, pageable);

       return pagedResourcesAssembler.toModel(assignmentPage, assignmentNotificationAssembler);
    }

    @CheckSecurity.Notifications.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PagedModel<AssignmentNotificationModel> findAllAssignedOrUnassigned(@RequestParam String assign,
                                                                         @PageableDefault(size = 2) Pageable pageable){

        if(assign.equals("assignedTasks")){
            Page<Assignment> assignmentPageAssigned = assignmentRepository.findAllAssigned(pageable);
            return pagedResourcesAssembler.toModel(new PageWrapper<>(assignmentPageAssigned, pageable),
                    assignmentNotificationAssembler);
        }

        Page<Assignment> assignmentPageUnassigned = assignmentRepository.findAllUnassigned(pageable);
        return pagedResourcesAssembler.toModel(new PageWrapper<>(assignmentPageUnassigned, pageable),
                assignmentNotificationAssembler);
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

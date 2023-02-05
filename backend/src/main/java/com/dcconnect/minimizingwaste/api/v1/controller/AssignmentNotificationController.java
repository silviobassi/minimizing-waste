package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.model.AssignmentNotificationModel;
import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentNotificationAssembler;
import com.dcconnect.minimizingwaste.api.v1.openapi.AssignmentNotificationControllerOpenApi;
import com.dcconnect.minimizingwaste.core.data.PageableTranslator;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentNotificationFilter;
import com.dcconnect.minimizingwaste.infrastructure.spec.AssignmentNotificationSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/notifications/assignments")
public class AssignmentNotificationController implements AssignmentNotificationControllerOpenApi {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentNotificationAssembler assignmentNotificationAssembler;

    @CheckSecurity.Notifications.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/available")
    public List<AssignmentNotificationModel> search(AssignmentNotificationFilter assignmentNotificationFilter){
        return assignmentNotificationAssembler
                .toCollectionModel(assignmentRepository.findAll(
                        AssignmentNotificationSpecs.usingFilter(assignmentNotificationFilter)));
    }
    private Pageable pageableTranslate(Pageable apiPageable){
        var mapping = Map.of(
                "completed", "completed",
                "approved", "approved",
                "currentDate", "currentDate"
        );

        return PageableTranslator.translate(apiPageable, mapping);
    }

}

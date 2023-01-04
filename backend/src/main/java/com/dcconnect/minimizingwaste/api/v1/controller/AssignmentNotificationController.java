package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.model.AssignmentNotificationModel;
import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentNotificationAssembler;
import com.dcconnect.minimizingwaste.api.v1.openapi.AssignmentNotificationControllerOpenApi;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/notifications/assignments")
public class AssignmentNotificationController implements AssignmentNotificationControllerOpenApi {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentNotificationAssembler assignmentNotificationAssembler;
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/attach")
    public List<AssignmentNotificationModel> findNotificationByAttachAssignment(){
        return assignmentNotificationAssembler
                .toCollectionModel(assignmentRepository.findNotificationByAttachAssignment());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/completed")
    public List<AssignmentNotificationModel> findNotificationByCompletedAssignment(){
        return assignmentNotificationAssembler
                .toCollectionModel(assignmentRepository.findNotificationByCompletedAssignment());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/approved")
    public List<AssignmentNotificationModel> findNotificationByApprovedAssignment(){
        return assignmentNotificationAssembler
                .toCollectionModel(assignmentRepository.findNotificationByApprovedAssignment());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/disapproved")
    public List<AssignmentNotificationModel> findNotificationByDisapprovedAssignment(){
        return assignmentNotificationAssembler
                .toCollectionModel(assignmentRepository.findNotificationByDisapprovedAssignment());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/expired")
    public List<AssignmentNotificationModel> findNotificationByExpiredAssignment(){
        return assignmentNotificationAssembler
                .toCollectionModel(assignmentRepository.findNotificationByExpiredAssignment());
    }

}

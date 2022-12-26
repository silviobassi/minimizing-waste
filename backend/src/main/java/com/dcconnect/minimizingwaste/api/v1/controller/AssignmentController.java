package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentSummary;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/tasks")
public class AssignmentController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private AssignmentAssembler assignmentAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<AssignmentSummary> all(){
        List<Assignment> assignments = taskRepository.findAll();
        return assignmentAssembler.toCollectionModel(assignments);
    }
}

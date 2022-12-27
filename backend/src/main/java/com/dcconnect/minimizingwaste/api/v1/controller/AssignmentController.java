package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.AssignmentDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentInput;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import com.dcconnect.minimizingwaste.domain.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentAssembler assignmentAssembler;

    @Autowired
    private AssignmentDisassembler assignmentDisassembler;

    @Autowired
    private AssignmentService assignmentService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<AssignmentModel> all(){
        List<Assignment> assignments = assignmentRepository.findAll();
        return assignmentAssembler.toCollectionModel(assignments);
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
}

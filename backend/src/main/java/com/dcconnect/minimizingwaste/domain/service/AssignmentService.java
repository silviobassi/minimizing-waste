package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.AssignmentNotFoundException;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AssignmentService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private WorkStationService workStationService;

    @Transactional
    public Assignment create(Assignment assignment){

       WorkStation workStation = workStationService.findOrFail(assignment.getWorkStation().getId());
       assignment.setWorkStation(workStation);

       //To do Set Users or Employees
       return assignment;
    }

    @Transactional
    public void delete(Long assignmentId){
        try {
            taskRepository.deleteById(assignmentId);
            taskRepository.flush();

        } catch (EmptyResultDataAccessException e){
            throw new AssignmentNotFoundException(assignmentId);

        }
    }

    public Assignment findOrFail(Long assignmentId){
        return taskRepository.findById(assignmentId)
                .orElseThrow(() -> new AssignmentNotFoundException(assignmentId));
    }


}

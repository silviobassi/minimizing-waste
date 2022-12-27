package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.AssignmentNotFoundException;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private WorkStationService workStationService;

    @Transactional
    public Assignment create(Assignment assignment){
        assignmentRepository.detach(assignment);

        WorkStation workStation = workStationService.findOrFail(assignment.getWorkStation().getId());
        assignment.setWorkStation(workStation);

        return assignmentRepository.save(assignment);
    }

    @Transactional
    public void delete(Long assignmentId){
        try {
            assignmentRepository.deleteById(assignmentId);
            assignmentRepository.flush();

        } catch (EmptyResultDataAccessException e){
            throw new AssignmentNotFoundException(assignmentId);
        }
    }

    public Assignment findOrFail(Long assignmentId){
        return assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new AssignmentNotFoundException(assignmentId));
    }


}

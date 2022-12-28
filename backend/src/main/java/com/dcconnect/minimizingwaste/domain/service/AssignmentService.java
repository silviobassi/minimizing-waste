package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.AssignmentNotFoundException;

import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private WorkStationService workStationService;

    @Autowired
    private UserService userService;

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

    @Transactional
    public void attachEmployee(Long assignmentId, Long employeeResponsibleId){
        Assignment currentAssignment = findOrFail(assignmentId);
        User currentEmployeeResponsible = userService.findOrFail(employeeResponsibleId);

        List<User> employeeResponsibleMatches = getEmployeeResponsibleMatches(
                currentAssignment, currentEmployeeResponsible);

        if(!employeeResponsibleMatches.isEmpty()){
            throw new BusinessException(String.format(
                    "O Colaborador com o nome: %s já está atribuído à tarefa", currentEmployeeResponsible.getName()));
        }

        currentAssignment.addEmployeeResponsible(currentEmployeeResponsible);
    }

    @Transactional
    public void detachEmployee(Long assignmentId, Long employeeResponsibleId){
        Assignment currentAssignment = findOrFail(assignmentId);
        User currentEmployeeResponsible = userService.findOrFail(employeeResponsibleId);

        List<User> employeeResponsibleMatches = getEmployeeResponsibleMatches(
                currentAssignment, currentEmployeeResponsible);

        if(employeeResponsibleMatches.isEmpty()){
            throw new BusinessException(String.format(
                    "O Colaborador com o nome: %s não está atribuído à tarefa", currentEmployeeResponsible.getName()));
        }

        currentAssignment.removeEmployeeResponsible(currentEmployeeResponsible);
    }

    public Assignment findOrFail(Long assignmentId){
        return assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new AssignmentNotFoundException(assignmentId));
    }

    private List<User> getEmployeeResponsibleMatches(Assignment currentAssignment, User currentEmployeeResponsible) {
        List<User> employeeResponsibleMatches = currentAssignment.getEmployeeResponsible().stream().filter(
                currentEmployee -> currentEmployee.equals(currentEmployeeResponsible)).toList();
        return employeeResponsibleMatches;
    }


}

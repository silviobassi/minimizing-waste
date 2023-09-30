package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.AssignmentNotFoundException;
import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.Notification;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private WorkStationService workStationService;

    @Autowired NotificationService notificationService;

    @Autowired
    private UserService userService;

    @Transactional
    public Assignment create(Assignment assignment){
        assignmentRepository.detach(assignment);

        WorkStation workStation = workStationService.findOrFail(assignment.getWorkStation().getId());
        Notification notification = notificationService.create(assignment.getNotification());
        assignment.setWorkStation(workStation);
        assignment.setNotification(notification);

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
    public void attachEmployee(Long employeeResponsibleId, Assignment assignment){
        User currentEmployeeResponsible = userService.findOrFail(employeeResponsibleId);

        if(assignment.getEmployeesResponsible().contains(currentEmployeeResponsible)){
            throw new BusinessException(String.format(
                    "O Colaborador %s já está atribuído à tarefa %s",
                    currentEmployeeResponsible.getName(), assignment.getTitle()));
        }

        Notification notification = notificationService.create(assignment.getNotification());
        assignment.setNotification(notification);
        assignment.addEmployeeResponsible(currentEmployeeResponsible);
    }

    @Transactional
    public void detachEmployee(Long employeeResponsibleId, Assignment assignment){
        User currentEmployeeResponsible = userService.findOrFail(employeeResponsibleId);

        if(!assignment.getEmployeesResponsible().contains(currentEmployeeResponsible)){
            throw new BusinessException(String.format(
                    "O Colaborador com o nome: %s não está atribuído a esta tarefa",
                    currentEmployeeResponsible.getName()));
        }

        if(assignment.getApproved()){
            throw new BusinessException(String.format(
                    "O colaborador %s não pode ser desatribuído, pois esta tarefa foi aprovada",
                    currentEmployeeResponsible.getName()));
        }


        Notification notification = notificationService.create(assignment.getNotification());
        assignment.setNotification(notification);
        assignment.removeEmployeeResponsible(currentEmployeeResponsible);
    }

    public Assignment findOrFail(Long assignmentId){
        return assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new AssignmentNotFoundException(assignmentId));
    }
    @Transactional
    public void completeAssignment(Assignment currentAssignment){

        boolean isEmptyEmployeeResponsible = currentAssignment.getEmployeesResponsible().isEmpty();

        if(isEmptyEmployeeResponsible){
            throw new BusinessException(
                    "Para alterar o status desta tarefa, a mesma precisa estar atribuída, ao menos, a um colaborador.");
        }

        if(currentAssignment.getApproved())
            throw new BusinessException(
                    "O status da tarefa não pode ser alterado, pois esta já foi aprovada.");

        assignmentRepository.save(currentAssignment);
    }

    @Transactional
    public void approveAssignment(Assignment currentAssignment){

        if(!currentAssignment.getCompleted() && currentAssignment.getApproved()){
            throw new BusinessException(
                    String.format("A Tarefa com o código %d não pode ser aprovada, pois ainda não foi concluída.",
                            currentAssignment.getId()));
        }

        if(!currentAssignment.getApproved()){
            currentAssignment.setCompleted(false);
            currentAssignment.setEndDate(null);
        }

        assignmentRepository.save(currentAssignment);

    }

}

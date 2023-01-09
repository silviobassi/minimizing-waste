package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentNotificationInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;

@Tag(name = "Assignments")
public interface AssignmentEmployeeControllerOpenApi {

    @Operation(summary = "Lista colaboradores atribuídos a respectivas tarefas")
    CollectionModel<UserDetailedModel> all(Long assignmentId);
    @Operation(summary = "Associa um colaborador a determinada tarefa")
    ResponseEntity<Void> attachEmployee(Long assignmentId, Long employeeResponsibleId,
                                               AssignmentNotificationInput assignmentNotificationInput);
    @Operation(summary = "Disassocia um colaborador a determinada tarefa")
    ResponseEntity<Void> detachEmployee(Long assignmentId, Long employeeResponsibleId,
                                               AssignmentNotificationInput assignmentNotificationInput);
}

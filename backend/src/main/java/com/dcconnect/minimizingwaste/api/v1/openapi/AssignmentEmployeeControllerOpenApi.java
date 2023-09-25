package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentNotificationInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;

@Tag(name = "Assignments")
public interface AssignmentEmployeeControllerOpenApi {

    @Operation(summary = "Lista colaboradores atribuídos a respectivas tarefas", responses = {
            @ApiResponse(responseCode = "204", description = "Associação completada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    })
    CollectionModel<UserDetailedModel> all(@Parameter(description = "ID de uma tarefa") Long assignmentId);
    @Operation(summary = "Associa um colaborador a determinada tarefa", responses = {
            @ApiResponse(responseCode = "204", description = "Associação completada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Responsável não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    ResponseEntity<Void> attachEmployee(@Parameter(description = "ID de uma tarefa") Long assignmentId,
                                        @Parameter(description = "ID de um responsável")Long employeeResponsibleId);
    @Operation(summary = "Disassocia um colaborador a determinada tarefa", responses = {
            @ApiResponse(responseCode = "204", description = "Disassociação completada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Responsável não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    ResponseEntity<Void> detachEmployee(@Parameter(description = "ID de uma tarefa") Long assignmentId,
                                        @Parameter(description = "ID de um responsável")Long employeeResponsibleId);
}

package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AssignmentModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentApprovedInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentCompletedInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentInput;
import com.dcconnect.minimizingwaste.core.springdoc.PageableParameter;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.CollectionModel;

@Tag(name = "Assignments")
public interface AssignmentControllerOpenApi {

    @Operation(summary = "Lista as Tarefas")
    @PageableParameter

    @Parameter(
            in = ParameterIn.QUERY,
            name = "assignmentTitle",
            example = "Revestir Banheiros",
            description = "Título da Tarefa",
            schema = @Schema(type = "string")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "startDate",
            description = "Data de Início",
            example = "2023-01-10T15:00:00Z",
            schema = @Schema(type = "date-time")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "endDate",
            description = "Data de Finalização",
            example = "2023-01-21T14:00:00Z",
            schema = @Schema(type = "date-time")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "deadline",
            description = "Data final para conclusão",
            example = "2023-01-22T11:07:00Z",
            schema = @Schema(type = "date-time")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "completed",
            description = "Status de Finalização",
            example = "true",
            schema = @Schema(type = "boolean")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "approved",
            description = "Status de Aprovação",
            example = "false",
            schema = @Schema(type = "boolean")
    )
    CollectionModel<AssignmentModel> search(@Parameter(hidden = true) AssignmentFilter assignmentFilter,
                                                   @Parameter(hidden = true) Pageable pageable);
    @Operation(summary = "Cria uma nova tarefa")
    AssignmentModel create(@RequestBody(description = "Representação de um nova tarefa", required = true)
                           AssignmentInput assignmentInput);
    @Operation(summary = "Edita uma tarefa", responses = {
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    AssignmentModel update( @Parameter(description = "ID de uma tarefa", example = "1", required = true)
                            Long assignmentId,
                            @RequestBody(description = "Representação de uma tarefa editada", required = true)
                            AssignmentInput assignmentInput);
    @Operation(summary = "Deleta uma tarefa", responses = {
            @ApiResponse(responseCode = "204", description = "Tarefa deletada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    void delete(Long assignmentId);
    @Operation(summary = "Busca uma taerfa pelo ID", responses = {
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    AssignmentModel findOrFail(@Parameter(description = "ID de iuma tarefa") Long assignmentId);
    @Operation(summary = "Conclui ou não uma tarefa", responses = {
            @ApiResponse(responseCode = "204", description = "Tarefa completada ou não com sucesso"),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    void completeAssignment(@Parameter(description = "Representação da Conclusão da Tarefa")
                            AssignmentCompletedInput assignmentCompletedInput,
                            @Parameter(description = "ID de uma tarefa") Long assignmentId);
    @Operation(summary = "Aprova ou reprova uma tarefa", responses = {
            @ApiResponse(responseCode = "204", description = "Tarefa aprovada ou reprovada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    void approveAssignment(@Parameter(description = "Representação da Aprovação da Tarefa")
                           AssignmentApprovedInput assignmentApprovedInput,
                           @Parameter(description = "ID de uma tarefa") Long assignmentId);

}

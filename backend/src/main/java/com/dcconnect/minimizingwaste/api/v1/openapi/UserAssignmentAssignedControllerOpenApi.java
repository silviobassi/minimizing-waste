package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.UserAssignedModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "Assignments")
public interface UserAssignmentAssignedControllerOpenApi {

    @Operation(summary = "Lista os usuários atribuídos ou não a tarefa atual", responses = {
            @ApiResponse(responseCode = "400", description = "ID da tarefa inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),

            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    @Parameter(
            in = ParameterIn.QUERY,
            name = "assigned",
            example = "true",
            description = "Natureza das consulta",
            schema = @Schema(type = "boolean")
    )
    PagedModel<UserAssignedModel> allAssigned(
            @Parameter(hidden = true) @PageableDefault(size = 10) Pageable pageable,
            @Parameter(hidden = true)  @RequestParam(required = true) Boolean assigned,
                                                                     @PathVariable Long assignmentId);
}

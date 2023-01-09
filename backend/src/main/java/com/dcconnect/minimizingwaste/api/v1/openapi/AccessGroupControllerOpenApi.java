package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummaryModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AccessGroupInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;

@Tag(name = "Users")
public interface AccessGroupControllerOpenApi {

    @Operation(summary = "Lista os grupos de acesso")
    CollectionModel<AccessGroupSummaryModel> all();

    @Operation(summary = "Cria um grupo de acesso")
    AccessGroupSummaryModel create(
            @RequestBody(description = "Representação de um a novo grupo de acesso", required = true)
            AccessGroupInput accessGroupInput);

    @Operation(summary = "Edita um grupo de acesso",  responses = {
            @ApiResponse(responseCode = "400",
                    description = "ID do grupo de acesso inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))
            ),
            @ApiResponse(responseCode = "404",
                    description = "Grupo de acesso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema"))
            )
    })
    AccessGroupSummaryModel update(
            @Parameter(description = "ID de um grupo de acesso", example = "1", required = true)
            Long accessGroupId, AccessGroupInput accessGroupInput);

    @Operation(summary = "Deleta um grupo de acesso",  responses = {
            @ApiResponse(responseCode = "400",
                    description = "ID do grupo de acesso inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))
            ),
            @ApiResponse(responseCode = "404",
                    description = "Grupo de acesso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema"))
            )
    })
    ResponseEntity<Void> delete(
            @Parameter(description = "ID de um grupo de acesso", example = "1", required = true)
            Long accessGroupId);

}

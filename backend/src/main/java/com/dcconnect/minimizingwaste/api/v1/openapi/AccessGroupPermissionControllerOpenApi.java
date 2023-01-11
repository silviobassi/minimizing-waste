package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailedModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;

@Tag(name = "Users")
public interface AccessGroupPermissionControllerOpenApi {

    @Operation(summary = "Lista as permissões relacionadas ao grupo atual", responses = {
            @ApiResponse(responseCode = "400", description = "ID do grupo de acesso inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),
            @ApiResponse(responseCode = "404", description = "Grupo de acesso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    CollectionModel<PermissionDetailedModel> all(Long accessGroupId);

    @Operation(summary = "Disassocia as permissões relacionadas ao grupo atual",  responses = {
            @ApiResponse(responseCode = "204", description = "Disassociação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do grupo de acesso/permissão inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Grupo de acesso/permissão não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    ResponseEntity<Void> disassociate(@Parameter(description = "ID do grupo de acesso", required = true) Long accessGroupId,
                                      @Parameter(description = "ID da permissão", required = true) Long permissionId);
    @Operation(summary = "Associa as permissões relacionadas ao grupo atual", responses = {
            @ApiResponse(responseCode = "204", description = "Associação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do grupo de acesso/permissão inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Grupo de acesso/permissão não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    void associate(@Parameter(description = "ID do grupo de acesso", required = true) Long accessGroupId,
                   @Parameter(description = "ID da permissão", required = true) Long permissionId);

}

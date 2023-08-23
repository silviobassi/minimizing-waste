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

@Tag(name = "Users Role")
public interface RolePermissionControllerOpenApi {

    @Operation(summary = "Lista as permissões relacionadas ao role atual", responses = {
            @ApiResponse(responseCode = "400", description = "ID de um role  inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Role não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    CollectionModel<PermissionDetailedModel> all(Long roleId);

    @Operation(summary = "Disassocia as permissões relacionadas ao role atual",  responses = {
            @ApiResponse(responseCode = "204", description = "Disassociação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID da role/permissão inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),

            @ApiResponse(responseCode = "404", description = "Grupo de role/permissão não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    ResponseEntity<Void> disassociate(@Parameter(description = "ID do role de acesso", required = true) Long roleId,
                                      @Parameter(description = "ID da permissão", required = true) Long permissionId);
    @Operation(summary = "Associa as permissões relacionadas ao role atual", responses = {
            @ApiResponse(responseCode = "204", description = "Associação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do role/permissão inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),

            @ApiResponse(responseCode = "404", description = "Role/permissão não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    void associate(@Parameter(description = "ID do role de acesso", required = true) Long roleId,
                   @Parameter(description = "ID da permissão", required = true) Long permissionId);

}

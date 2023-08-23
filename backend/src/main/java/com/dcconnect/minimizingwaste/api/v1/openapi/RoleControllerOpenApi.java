package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.RoleDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.RoleInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;

@Tag(name = "Users Role")
@SecurityRequirement(name = "security_auth")
public interface RoleControllerOpenApi {

    @Operation(summary = "Lista os roles de acessos")
    CollectionModel<RoleDetailedModel> all();

    @Operation(summary = "Cria um role de acessos")
    RoleDetailedModel create(
            @RequestBody(description = "Representação de um novo role", required = true)
            RoleInput roleInput);

    @Operation(summary = "Edita um role",  responses = {
            @ApiResponse(responseCode = "400",
                    description = "ID do role  inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))
            ),
            @ApiResponse(responseCode = "404",
                    description = "Role não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))
            )
    })
    RoleDetailedModel update(
            @Parameter(description = "ID do role de acessos", example = "1", required = true)
            Long accessGroupId, RoleInput roleInput);

    @Operation(summary = "Deleta um role",  responses = {
            @ApiResponse(responseCode = "400",
                    description = "ID de uma role inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))
            ),
            @ApiResponse(responseCode = "404",
                    description = "Role não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))
            )
    })
    ResponseEntity<Void> delete(
            @Parameter(description = "ID do role inválido", example = "1", required = true)
            Long accessGroupId);

}

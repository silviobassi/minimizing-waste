package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailedModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "Users Role")
public interface PermissionControllerOpenApi {

    @Operation(summary = "Lista as permissões de role de acesso")
    CollectionModel<PermissionDetailedModel> all();

    @Parameter(
            in = ParameterIn.QUERY,
            name = "notGranted",
            description = "Permissões não concedidas",
            example = "PERMITIR EDITAR USUÁRIO, PERMITIR DEVOLVER RECURSOS ALOCADOS...",
            schema = @Schema(type = "string")
    )
    @Operation(summary = "Lista as permissões de role de acesso não concedidas ao usuário atual", responses = {
            @ApiResponse(responseCode = "404", description = "Role da permissão não encontrada",
            content = @Content(schema = @Schema(ref = "Problem")))
    })
    CollectionModel<PermissionDetailedModel> allNotOrGranted( @Parameter(description = "ID de um role",
            example = "1", required = true) Long roleId,  @RequestParam(required = true, defaultValue = "granted") String permission);


}

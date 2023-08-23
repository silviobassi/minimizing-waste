package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.RoleDetailedModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Users Role")
public interface UserRoleControllerOpenApi {

    @Operation(summary = "Apresenta o role  do usuário",  responses = {
            @ApiResponse(responseCode = "400", description = "ID do usuário",
                    content = @Content(schema = @Schema(ref = "Problem"))),
    })
    RoleDetailedModel all(Long userId);

    @Operation(summary = "Disassocia um determinado role do usuário atual", responses = {
            @ApiResponse(responseCode = "204", description = "Disassociação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do usuário/role inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    ResponseEntity<Void> disassociate(Long userId, Long accessGroupId);
    @Operation(summary = "Associa um determinado role do usuário atual", responses = {
            @ApiResponse(responseCode = "204", description = "Associação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do usuário/role inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),
    })
    ResponseEntity<Void> associate(Long userId, Long accessGroupId);

}

package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.RoleSummaryModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "Users Role")
public interface UserRoleControllerOpenApi {


    @Operation(summary = "Disassocia um determinado role do usuário atual", responses = {
            @ApiResponse(responseCode = "204", description = "Disassociação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do usuário/role inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    ResponseEntity<Void> disassociate(@Parameter(description = "ID de um usuário", example = "1", required = true) Long userId, Long accessGroupId);
    @Operation(summary = "Associa um determinado role do usuário atual", responses = {
            @ApiResponse(responseCode = "204", description = "Associação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do usuário/role inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),
    })
    ResponseEntity<Void> associate(@Parameter(description = "ID de um usuário", example = "1", required = true) Long userId, Long accessGroupId);

    @Parameter(
            in = ParameterIn.QUERY,
            name = "role",
            example = "granted ",
            description = "Lista os roles ",
            schema = @Schema(type = "string")
    )
    @Operation(summary = "Lista os roles associados ou não aos usuário atual")
    CollectionModel<RoleSummaryModel> allNotOrGranted(@Parameter(description = "ID de um usuário", example = "1", required = true) Long userId,
            @RequestParam(required = false, defaultValue = "granted") String role);



}

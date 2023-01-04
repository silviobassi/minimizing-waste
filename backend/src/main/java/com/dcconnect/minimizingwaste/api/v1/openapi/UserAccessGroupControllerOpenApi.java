package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummaryModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;

@Tag(name = "Users")
public interface UserAccessGroupControllerOpenApi {

    @Operation(summary = "Lista os grupos de acesso  de cada usuário",  responses = {
            @ApiResponse(responseCode = "400", description = "ID do usuário",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    public CollectionModel<AccessGroupSummaryModel> all(Long userId);

    @Operation(summary = "Disassocia um determinado grupo ao usuário atual", responses = {
            @ApiResponse(responseCode = "204", description = "Disassociação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do usuário/grupo de acesso inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Usuário/grupo de acesso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })

    public ResponseEntity<Void> disassociate(Long userId, Long accessGroupId);
    @Operation(summary = "Associa um determinado grupo ao usuário atual", responses = {
            @ApiResponse(responseCode = "204", description = "Associação realizada com sucesso"),

            @ApiResponse(responseCode = "400", description = "ID do usuário/grupo de acesso inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Usuário/grupo de acesso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    public ResponseEntity<Void> associate(Long userId, Long accessGroupId);

}

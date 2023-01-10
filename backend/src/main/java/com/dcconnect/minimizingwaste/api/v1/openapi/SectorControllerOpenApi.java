package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.SectorModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SectorInput;
import com.dcconnect.minimizingwaste.domain.repository.filter.SectorFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;

@Tag(name = "Sectors")
public interface SectorControllerOpenApi {

    @Operation(summary = "Lista os setores")
    @Parameter(
            in = ParameterIn.QUERY,
            name = "sectorName",
            description = "Nome do setor",
            example = "Acabamento",
            schema = @Schema(type = "string")
    )
    CollectionModel<SectorModel> search(SectorFilter sectorFilter);

    @Operation(summary = "Cria um novo setor")
    SectorModel create(@RequestBody(description = "Representação de um novo setor", required = true)
                                  SectorInput sectorInput);

    @Operation(summary = "Edita um setor", responses = {
            @ApiResponse(responseCode = "400", description = "ID do setor inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Setor não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    SectorModel update(@Parameter(description = "ID de um setor" ,example = "1") Long sectorId,
                              @RequestBody(description = "Representação de um setor editado", required = true)
                              SectorInput sectorInput);

    @Operation(summary = "Deleta um setor", responses = {
            @ApiResponse(responseCode = "204", description = "Setor deletado com sucesso"),
            @ApiResponse(responseCode = "400", description = "ID do setor inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Setor não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    void delete(@Parameter(description = "ID de um setor" ,example = "1") Long sectorId);

    @Operation(summary = "Busca um setor pelo ID",  responses = {
            @ApiResponse(responseCode = "400", description = "ID do setor inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Setor não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    SectorModel findOrFail(@Parameter(description = "ID de um setor", example = "1") Long sectorId);

}

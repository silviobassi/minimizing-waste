package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.WorkStationModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationInput;
import com.dcconnect.minimizingwaste.domain.repository.filter.WorkStationFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;

@Tag(name = "Work Stations")
public interface WorkStationControllerOpenApi {

    @Operation(summary = "Lista as estações de trabalho")
    @Parameter(
            in = ParameterIn.QUERY,
            name = "workStationName",
            description = "Nome da Estação de Trabalho",
            example = "Bloco B Apto 178",
            schema = @Schema(type = "string")
    )
    CollectionModel<WorkStationModel> search(@Parameter(hidden = true) WorkStationFilter workStationFilter);
    @Operation(summary = "Cria uma nova estação de trabalho")
    WorkStationModel create(
            @RequestBody(description = "Representação de uma nova estação de trabalho", required = true)
            WorkStationInput workStationInput);
    @Operation(summary = "Edita uma estação de trabalho", responses = {
            @ApiResponse(responseCode = "404", description = "Estação de Trabalho não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Setor não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))),
    })
    WorkStationModel update(
            @Parameter(description = "ID de uma estação de trabalho", example = "1", required = true)
            Long workStationId,
            @RequestBody(description = "Representação de uma estação de trabalho editada", required = true)
            WorkStationInput workStationInput);

    @Operation(summary = "Deleta uma estação de trabalho", responses = {
            @ApiResponse(responseCode = "404", description = "Estação de Trabalho não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    void delete(@Parameter(description = "ID de uma estação de trabalho", example = "1", required = true)
            Long workStationId);

    @Operation(summary = "Deleta uma estação de trabalho", responses = {
            @ApiResponse(responseCode = "404", description = "Estação de Trabalho não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem"))),
    })
    WorkStationModel findOrFail(
            @Parameter(description = "ID de um usuário", example = "1", required = true)
            Long workStationId);

}

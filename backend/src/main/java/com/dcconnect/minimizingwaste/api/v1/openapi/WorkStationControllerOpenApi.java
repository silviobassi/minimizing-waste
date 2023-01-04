package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.WorkStationModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;

@Tag(name = "Work Stations")
public interface WorkStationControllerOpenApi {

    @Operation(summary = "Lista as estações de trabalho")
    PagedModel<WorkStationModel> all(@Parameter(hidden = true) Pageable pageable);

    @Operation(summary = "Cria uma estação de trabalho")
    public WorkStationModel create(
            @RequestBody(description = "Representação de um a nova estação de trabalho", required = true)
            WorkStationInput workStationInput);

    @Operation(summary = "Edita uma estação de trabalho", responses = {
            @ApiResponse(responseCode = "400", description = "ID da estação de trabalho inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Estação de trabalho não encontrada",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    public WorkStationModel update(
            @Parameter(description = "ID de uma estação de trabalho", example = "1", required = true)
            Long workStationId,
            @RequestBody(description = "Representação de uma estação de trabalho editada", required = true)
            WorkStationInput workStationInput);

    @Operation(summary = "Deleta uma estação de trabalho", responses = {
            @ApiResponse(responseCode = "400", description = "ID da estação de trabalho inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Estação de trabalho não encontrada",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    public void delete(
            @Parameter(description = "ID de uma estação de trabalho", example = "1", required = true)
            Long workStationId);

    @Operation(summary = "Deleta uma estação de trabalho", responses = {
            @ApiResponse(responseCode = "400", description = "ID do usuário inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))),

            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema")))
    })
    public WorkStationModel findOrFail(
            @Parameter(description = "ID de um usuário", example = "1", required = true)
            Long workStationId);

}

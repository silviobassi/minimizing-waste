package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplySummaryModel;
import com.dcconnect.minimizingwaste.core.springdoc.PageableParameter;
import com.dcconnect.minimizingwaste.domain.repository.filter.SupplyFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;

@Tag(name = "Supplies")
public interface SupplyControllerOpenApi {

    @Operation(summary = "Lista recursos")
    @Parameter(
            in = ParameterIn.QUERY,
            name = "supplyName",
            description = "Nome do recurso",
            example = "Cimento",
            schema = @Schema(type = "string")
    )
    @PageableParameter
    PagedModel<SupplySummaryModel> search(@Parameter(hidden = true) SupplyFilter supplyFilter,
                                          @Parameter(hidden = true) Pageable pageable);
    @Operation(summary = "Deleta um recurso", responses = {
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "204", description = "Recurso deletado com sucesso")
    })
    void delete(@Parameter(description = "ID de um recurso", required = true) Long supplyId);
    @Operation(summary = "Busca um recurso por ID", responses = {
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    SupplyDetailedModel findById(@Parameter(description = "ID de um recurso", required = true) Long supplyId);
}

package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.MaterialSupplyModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMaterialInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Supplies")
public interface MaterialSupplyControllerOpenApi {

    @Operation(summary = "Cria um Recurso do Tipo Material")
    public MaterialSupplyModel create(
            @RequestBody(description = "Representação de um novo Recurso do Tipo Material", required = true)
            SupplyMaterialInput supplyMaterialInput);

    @Operation(summary = "Edita um Recurso do Tipo Material" ,  responses = {
            @ApiResponse(responseCode = "400",
                    description = "ID do recurso inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))
            ),
            @ApiResponse(responseCode = "404",
                    description = "Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema"))
            )
    })
    public MaterialSupplyModel update(
            @RequestBody(description = "Representação de um Recurso do Tipo Material editado", required = true)
            SupplyMaterialInput supplyMaterialInput, Long supplyMaterialId);

}

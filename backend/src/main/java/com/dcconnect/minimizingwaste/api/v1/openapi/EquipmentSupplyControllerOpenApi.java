package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.EquipmentSupplyModel;
import com.dcconnect.minimizingwaste.api.v1.model.MaterialSupplyModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyEquipmentInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Supplies")
public interface EquipmentSupplyControllerOpenApi {

    @Operation(summary = "Cria um Recurso do Tipo Equipamento")
    EquipmentSupplyModel create(
            @RequestBody(description = "Representação de um novo Recurso do Tipo Equipamento", required = true)
            SupplyEquipmentInput supplyEquipmentInput);

    @Operation(summary = "Edita um Recurso do Tipo Equipamento" ,  responses = {
            @ApiResponse(responseCode = "400",
                    description = "ID do recurso inválido",
                    content = @Content(schema = @Schema(ref = "Problema"))
            ),
            @ApiResponse(responseCode = "404",
                    description = "Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problema"))
            )
    })
    EquipmentSupplyModel update(
            @RequestBody(description = "Representação de um Recurso do Tipo Equipamento editado", required = true)
            SupplyEquipmentInput supplyEquipmentInput,
            @Parameter(description = "ID de um recurso do tipo equipamento") Long supplyEquipmentId);

}

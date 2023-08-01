package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyEquipmentInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@Tag(name = "Supplies Equipment")
public interface SupplyEquipmentControllerOpenApi {

    @Operation(summary = "Cria um novo recurso do tipo equipamento")
    SupplyDetailedModel createEquipment(@RequestBody(description = "Representação de um novo recurso", required = true)
                                        SupplyEquipmentInput supplyEquipmentInput);

    @Operation(summary = "Edita um recurso do tipo equipamento", responses = {
            @ApiResponse(responseCode = "400", description = "ID do recurso inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),

            @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    SupplyDetailedModel updateEquipment(@PathVariable Long supplyId,
                                        @RequestBody @Valid SupplyEquipmentInput supplyEquipmentInput);
}

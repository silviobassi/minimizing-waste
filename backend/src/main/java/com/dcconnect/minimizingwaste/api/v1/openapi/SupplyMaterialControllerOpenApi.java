package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyEquipmentInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMaterialInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "Supplies Material")
public interface SupplyMaterialControllerOpenApi {

    @Operation(summary = "Cria um novo recurso do tipo material")
    SupplyDetailedModel createMaterial(@RequestBody(description = "Representação de um novo recurso", required = true)
                                        SupplyMaterialInput supplyMaterialInput);

    @Operation(summary = "Edita um recurso do tipo material", responses = {
            @ApiResponse(responseCode = "400", description = "ID do recurso inválido",
                    content = @Content(schema = @Schema(ref = "Problem"))),

            @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    SupplyDetailedModel updateMaterial(@PathVariable Long supplyId,
                                        @RequestBody @Valid SupplyMaterialInput supplyMaterialInput);
}

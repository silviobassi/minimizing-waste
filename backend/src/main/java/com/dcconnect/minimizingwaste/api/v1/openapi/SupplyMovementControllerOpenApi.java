package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.DevolvedSupplyMovementInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.core.springdoc.PageableParameter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "Supplies Movement")
public interface SupplyMovementControllerOpenApi {

    @Operation(summary = "Lista os movimentos de recursos")
    @PageableParameter
    PagedModel<SupplyMovementModel> all(@Parameter(hidden = true) Pageable pageable);
    @Operation(summary = "Cria um novo movimento de recurso", responses = {
            @ApiResponse(responseCode = "404", description = "Estação de Trabalho não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem"))),
    })
    SupplyMovementModel create(
            @RequestBody(description = "Representação de uma novo movimento de recurso", required = true)
            SupplyMovementInput supplyMovementInput);
    @Operation(summary = "Edita um movimento de recurso", responses = {
            @ApiResponse(responseCode = "404", description = "Movimento de Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Estação de Trabalho não encontrada",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "404", description = "Colaborador não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    SupplyMovementModel update(@RequestBody(description = "Representação de um recurso a editar")
                               SupplyMovementInput supplyMovementInput,
                               @Parameter(description = "ID de um movimento de recurso",
                                       example = "1", required = true) Long supplyMovementId);
    @Operation(summary = "Deleta um movimento de recurso", responses = {
            @ApiResponse(responseCode = "404", description = "Movimento de Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "204", description = "Movimento de recurso deletado com sucesso")
    })
    void delete(Long supplyMovementId);
    @Operation(summary = "Deleta um movimento de recurso", responses = {
            @ApiResponse(responseCode = "404", description = "Movimento de Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    SupplyMovementModel findById(Long supplyMovementId);
    @Operation(summary = "Devolve uma quantia de recurso")
    SupplyMovementModel giveBackSupply(@RequestBody(description = "Representação do recurso a devolver")
                                       DevolvedSupplyMovementInput devolvedSupplyMovementInput,
                                       @Parameter(description = "ID de um movimento de recurso",
                                               example = "1", required = true) Long supplyMovementId);
    @Operation(summary = "Disponibiliza um movimento de recurso em estado ocioso", responses = {
            @ApiResponse(responseCode = "404", description = "Movimento de Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "204", description = "Recurso desocupado com sucesso")
    })
    ResponseEntity<Void> vacateSupply(@Parameter(
            description = "ID de um movimento de recurso", example = "1", required = true) Long supplyMovementId);

    @Operation(summary = "Fim do recurso alocado", responses = {
            @ApiResponse(responseCode = "404", description = "Movimento de Recurso não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem"))),
            @ApiResponse(responseCode = "204", description = "Recurso finalizado com sucesso")
    })
    ResponseEntity<Void> endSupplyAllocated(Long supplyMovementId);
}

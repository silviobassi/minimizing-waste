package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.DevolvedSupplyMovementInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.core.springdoc.PageableParameter;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "Supplies")
public interface SupplyMovementControllerOpenApi {

    @Operation(summary = "Lista os movimentos de recursos")
    @PageableParameter
    public PagedModel<SupplyMovementModel> all(@Parameter(hidden = true) Pageable pageable);
    @Operation(summary = "Cria um novo movimento de recurso")
    public SupplyMovementModel create(SupplyMovementInput supplyMovementInput);
    @Operation(summary = "Edita um movimento de recurso")
    public SupplyMovementModel update(SupplyMovementInput supplyMovementInput, Long supplyMovementId);
    @Operation(summary = "Deleta um movimento de recurso")
    public void delete(Long supplyMovementId);
    @Operation(summary = "Deleta um movimento de recurso")
    public SupplyMovementModel findById(Long supplyMovementId);
    @Operation(summary = "Devolve uma quantia de recurso")
    public SupplyMovementModel giveBackSupply(DevolvedSupplyMovementInput devolvedSupplyMovementInput,
                                              Long supplyMovementId);
    @Operation(summary = "Disponibiliza um movimento de recurso em estado ocioso")
    public ResponseEntity<Void> vacateSupply(Long supplyMovementId);
}

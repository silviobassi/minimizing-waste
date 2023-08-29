package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.DevolvedSupplyMovementDisassembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesMovementDisassembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyMovementAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyMovementDevolvedAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementDevolvedModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.DevolvedSupplyMovementInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.SupplyMovementControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import com.dcconnect.minimizingwaste.domain.service.SupplyMovementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/v1/supplies-movements")
public class SupplyMovementController implements SupplyMovementControllerOpenApi {

    @Autowired
    private SupplyRepository supplyRepository;

    @Autowired
    private SupplyMovementService supplyMovementService;

    @Autowired
    private SupplyMovementAssembler supplyMovementAssembler;

    @Autowired
    private SupplyMovementDevolvedAssembler supplyMovementDevolvedAssembler;

    @Autowired
    private SuppliesMovementDisassembler suppliesMovementDisassembler;

    @Autowired
    private DevolvedSupplyMovementDisassembler devolvedSupplyMovementDisassembler;

    @Autowired
    private PagedResourcesAssembler<SupplyMovement> pagedResourcesAssembler;

    @CheckSecurity.SuppliesMovements.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PagedModel<SupplyMovementModel> all(@PageableDefault(size = 2) Pageable pageable){
        Page<SupplyMovement> supplyPage = supplyRepository.findAllSupplyMovements(pageable);

        return pagedResourcesAssembler.toModel(supplyPage, supplyMovementAssembler);
    }

    @CheckSecurity.SuppliesMovements.CanEdit
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SupplyMovementModel create(@RequestBody @Valid SupplyMovementInput supplyMovementInput){
        SupplyMovement supplyMovement = suppliesMovementDisassembler.toDomainObject(supplyMovementInput);

        supplyMovement = supplyMovementService.create(supplyMovement);

        return supplyMovementAssembler.toModel(supplyMovement);
    }

    @CheckSecurity.SuppliesMovements.CanEdit
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyMovementId}")
    public SupplyMovementModel update(@RequestBody @Valid SupplyMovementInput supplyMovementInput,
                                      @PathVariable Long supplyMovementId){

        SupplyMovement currentSupplyMovement = supplyMovementService.findOrFail(supplyMovementId);

        suppliesMovementDisassembler.copyToDomainModel(supplyMovementInput, currentSupplyMovement);
        return supplyMovementAssembler.toModel(supplyMovementService.create(currentSupplyMovement));
    }

    @CheckSecurity.SuppliesMovements.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{supplyMovementId}")
    public void delete(@PathVariable Long supplyMovementId){
        supplyMovementService.delete(supplyMovementId);
    }

    @CheckSecurity.SuppliesMovements.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{supplyMovementId}")
    public SupplyMovementModel findById(@PathVariable Long supplyMovementId){
        return supplyMovementAssembler.toModel(supplyMovementService.findOrFail(supplyMovementId));
    }

    @CheckSecurity.SuppliesMovements.CanGiveBack
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/give-back/{supplyMovementId}")
    public SupplyMovementDevolvedModel giveBackSupply(
            @RequestBody @Valid DevolvedSupplyMovementInput devolvedSupplyMovementInput,
            @PathVariable Long supplyMovementId){

        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        devolvedSupplyMovementDisassembler.copyToDomainModel(devolvedSupplyMovementInput, supplyMovement);
        return supplyMovementDevolvedAssembler.toModel(supplyMovementService.giveBackSupply(supplyMovement));
    }

    @CheckSecurity.SuppliesMovements.CanVacate
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/vacancies/{supplyMovementId}")
    public ResponseEntity<Void> vacateSupply(@PathVariable Long supplyMovementId){
        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        supplyMovementService.vacateSupply(supplyMovement);
        return ResponseEntity.noContent().build();
    }

    @CheckSecurity.SuppliesMovements.CanEndSupply
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/end/{supplyMovementId}/supply")
    public ResponseEntity<Void> endSupplyAllocated(@PathVariable Long supplyMovementId){
        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        supplyMovementService.endSupply(supplyMovement);
        return ResponseEntity.noContent().build();
    }

}
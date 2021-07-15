package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesMovementAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesMovementDisassembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.ReturnedSupplyMovementDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.ReturnedSupplyMovementInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.repository.SuppliesMovementRepository;
import com.dcconnect.minimizingwaste.domain.service.SupplyMovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/v1/supplies-movements")
public class SupplyMovementController {

    @Autowired
    private SuppliesMovementRepository suppliesMovementRepository;

    @Autowired
    private SupplyMovementService supplyMovementService;

    @Autowired
    private SuppliesMovementAssembler suppliesMovementAssembler;

    @Autowired
    private SuppliesMovementDisassembler suppliesMovementDisassembler;

    @Autowired
    private ReturnedSupplyMovementDisassembler returnedSupplyMovementDisassembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<SupplyMovementModel> all(){
        return suppliesMovementAssembler.toCollectionModel(suppliesMovementRepository.findAll());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SupplyMovementModel create(@RequestBody @Valid SupplyMovementInput supplyMovementInput){
        SupplyMovement supplyMovement = suppliesMovementDisassembler.toDomainObject(supplyMovementInput);
        return suppliesMovementAssembler.toModel(supplyMovementService.create(supplyMovement));
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyMovementId}")
    public SupplyMovementModel update(@RequestBody @Valid SupplyMovementInput supplyMovementInput,
                                      @PathVariable Long supplyMovementId){
        SupplyMovement supplyMovementCurrent = supplyMovementService.findOrFail(supplyMovementId);
        suppliesMovementDisassembler.copyToDomainModel(supplyMovementInput, supplyMovementCurrent);
        return suppliesMovementAssembler.toModel(supplyMovementService.create(supplyMovementCurrent));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{supplyMovementId}")
    public void delete(@PathVariable Long supplyMovementId){
        supplyMovementService.delete(supplyMovementId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{supplyMovementId}")
    public SupplyMovementModel findById(@PathVariable Long supplyMovementId){
        return suppliesMovementAssembler.toModel(supplyMovementService.findOrFail(supplyMovementId));
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/returns/{supplyMovementId}")
    public SupplyMovementModel returnSupply(
            @RequestBody @Valid ReturnedSupplyMovementInput returnedSupplyMovementInput,
            @PathVariable Long supplyMovementId){

        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        returnedSupplyMovementDisassembler.copyToDomainModel(returnedSupplyMovementInput, supplyMovement);
        return suppliesMovementAssembler.toModel(supplyMovementService.returnSupply(supplyMovement));
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/vacancies/{supplyMovementId}")
    public void vacateSupply(@PathVariable Long supplyMovementId){
        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        supplyMovementService.vacateSupply(supplyMovement);
    }


}

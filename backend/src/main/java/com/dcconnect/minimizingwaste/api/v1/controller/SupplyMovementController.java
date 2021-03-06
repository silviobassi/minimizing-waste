package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.DevolvedSupplyMovementDisassembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesMovementAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesMovementDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.DevolvedSupplyMovementInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.SuppliesMovementRepository;
import com.dcconnect.minimizingwaste.domain.service.GiveBackAllocatedSupplyService;
import com.dcconnect.minimizingwaste.domain.service.SupplyMovementService;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
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
    private GiveBackAllocatedSupplyService giveBackAllocatedSupplyService;

    @Autowired
    private SuppliesMovementAssembler suppliesMovementAssembler;

    @Autowired
    private SuppliesMovementDisassembler suppliesMovementDisassembler;

    @Autowired
    private DevolvedSupplyMovementDisassembler devolvedSupplyMovementDisassembler;

    @Autowired
    private SupplyService supplyService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<SupplyMovementModel> all(){
        return suppliesMovementAssembler.toCollectionModel(suppliesMovementRepository.findAll());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SupplyMovementModel create(@RequestBody @Valid SupplyMovementInput supplyMovementInput){
        SupplyMovement supplyMovement = suppliesMovementDisassembler.toDomainObject(supplyMovementInput);
        supplyMovement = supplyMovementService.create(supplyMovement);

        return suppliesMovementAssembler.toModel(supplyMovement);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyMovementId}")
    public SupplyMovementModel update(@RequestBody @Valid SupplyMovementInput supplyMovementInput,
                                      @PathVariable Long supplyMovementId){

        SupplyMovement currentSupplyMovement = supplyMovementService.findOrFail(supplyMovementId);

        Long supplyId = supplyMovementInput.getSupply().getId();

        giveBackAllocatedSupplyService.whenReplaceSupply(currentSupplyMovement, supplyId);

        suppliesMovementDisassembler.copyToDomainModel(supplyMovementInput, currentSupplyMovement);
        return suppliesMovementAssembler.toModel(supplyMovementService.update(currentSupplyMovement, supplyId));
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
    public SupplyMovementModel giveBackSupply(
            @RequestBody @Valid DevolvedSupplyMovementInput devolvedSupplyMovementInput,
            @PathVariable Long supplyMovementId){

        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        devolvedSupplyMovementDisassembler.copyToDomainModel(devolvedSupplyMovementInput, supplyMovement);
        return suppliesMovementAssembler.toModel(supplyMovementService.giveBackSupply(supplyMovement));
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/vacancies/{supplyMovementId}")
    public void vacateSupply(@PathVariable Long supplyMovementId){
        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        supplyMovementService.vacateSupply(supplyMovement);
    }

}
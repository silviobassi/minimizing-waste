package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.DevolvedSupplyMovementDisassembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyMovementAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesMovementDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.DevolvedSupplyMovementInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.repository.SupplyMovementRepository;
import com.dcconnect.minimizingwaste.domain.service.GiveBackAllocatedSupplyService;
import com.dcconnect.minimizingwaste.domain.service.SupplyMovementService;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/v1/supplies-movements")
public class SupplyMovementController {

    @Autowired
    private SupplyMovementRepository supplyMovementRepository;

    @Autowired
    private SupplyMovementService supplyMovementService;

    @Autowired
    private GiveBackAllocatedSupplyService giveBackAllocatedSupplyService;

    @Autowired
    private SupplyMovementAssembler supplyMovementAssembler;

    @Autowired
    private SuppliesMovementDisassembler suppliesMovementDisassembler;

    @Autowired
    private DevolvedSupplyMovementDisassembler devolvedSupplyMovementDisassembler;

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private PagedResourcesAssembler<SupplyMovement> pagedResourcesAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PagedModel<SupplyMovementModel> all(@PageableDefault(size = 2) Pageable pageable){
        Page<SupplyMovement> supplyPage = supplyMovementRepository.findAll(pageable);

        return pagedResourcesAssembler.toModel(supplyPage, supplyMovementAssembler);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SupplyMovementModel create(@RequestBody @Valid SupplyMovementInput supplyMovementInput){
        SupplyMovement supplyMovement = suppliesMovementDisassembler.toDomainObject(supplyMovementInput);
        supplyMovement = supplyMovementService.create(supplyMovement);

        return supplyMovementAssembler.toModel(supplyMovement);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyMovementId}")
    public SupplyMovementModel update(@RequestBody @Valid SupplyMovementInput supplyMovementInput,
                                      @PathVariable Long supplyMovementId){

        SupplyMovement currentSupplyMovement = supplyMovementService.findOrFail(supplyMovementId);

        Long supplyId = supplyMovementInput.getSupply().getId();

        giveBackAllocatedSupplyService.whenReplaceSupply(currentSupplyMovement, supplyId);

        suppliesMovementDisassembler.copyToDomainModel(supplyMovementInput, currentSupplyMovement);
        return supplyMovementAssembler.toModel(supplyMovementService.update(currentSupplyMovement, supplyId));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{supplyMovementId}")
    public void delete(@PathVariable Long supplyMovementId){
        supplyMovementService.delete(supplyMovementId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{supplyMovementId}")
    public SupplyMovementModel findById(@PathVariable Long supplyMovementId){
        return supplyMovementAssembler.toModel(supplyMovementService.findOrFail(supplyMovementId));
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/give-back/{supplyMovementId}")
    public SupplyMovementModel giveBackSupply(
            @RequestBody @Valid DevolvedSupplyMovementInput devolvedSupplyMovementInput,
            @PathVariable Long supplyMovementId){

        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        devolvedSupplyMovementDisassembler.copyToDomainModel(devolvedSupplyMovementInput, supplyMovement);
        return supplyMovementAssembler.toModel(supplyMovementService.giveBackSupply(supplyMovement));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/vacancies/{supplyMovementId}")
    public void vacateSupply(@PathVariable Long supplyMovementId){
        SupplyMovement supplyMovement = supplyMovementService.findOrFail(supplyMovementId);
        supplyMovementService.vacateSupply(supplyMovement);
    }

}
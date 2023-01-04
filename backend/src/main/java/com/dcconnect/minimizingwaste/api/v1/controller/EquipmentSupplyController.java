package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.EquipmentSuppliesAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.EquipmentSuppliesDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.EquipmentSupplyModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyEquipmentInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.EquipmentSupplyControllerOpenApi;
import com.dcconnect.minimizingwaste.domain.model.Equipment;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/supplies/equipments")
public class EquipmentSupplyController implements EquipmentSupplyControllerOpenApi {

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private EquipmentSuppliesAssembler equipmentSuppliesAssembler;

    @Autowired
    private EquipmentSuppliesDisassembler equipmentSuppliesDisassembler;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public EquipmentSupplyModel create(@RequestBody @Valid SupplyEquipmentInput supplyEquipmentInput){
        Equipment equipment = equipmentSuppliesDisassembler.toDomainObject(supplyEquipmentInput);
        return equipmentSuppliesAssembler.toModel(supplyService.create(equipment));

    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyEquipmentId}")
    public EquipmentSupplyModel update(
            @RequestBody @Valid SupplyEquipmentInput supplyEquipmentInput,
            @PathVariable Long supplyEquipmentId) {

        Equipment supplyEquipmentCurrent = (Equipment) supplyService.findOrFail(supplyEquipmentId);
        equipmentSuppliesDisassembler.copyToDomainModel(supplyEquipmentInput, supplyEquipmentCurrent);
        return equipmentSuppliesAssembler.toModel(supplyService.create(supplyEquipmentCurrent));

    }

}

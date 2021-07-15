package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.EquipmentSuppliesAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.EquipmentSuppliesDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.EquipmentSupplySupplyModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.EquipmentSupplyInput;
import com.dcconnect.minimizingwaste.domain.model.Equipment;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/supplies/equipments")
public class EquipmentSupplyController {

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private EquipmentSuppliesAssembler equipmentSuppliesAssembler;

    @Autowired
    private EquipmentSuppliesDisassembler equipmentSuppliesDisassembler;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public EquipmentSupplySupplyModel create(@RequestBody @Valid EquipmentSupplyInput equipmentSupplyInput){
        Equipment equipment = equipmentSuppliesDisassembler.toDomainObject(equipmentSupplyInput);
        return equipmentSuppliesAssembler.toModel(supplyService.create(equipment));

    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyEquipmentId}")
    public EquipmentSupplySupplyModel update(
            @RequestBody @Valid EquipmentSupplyInput equipmentSupplyInput,
            @PathVariable Long supplyEquipmentId) {

        Equipment supplyEquipmentCurrent = (Equipment) supplyService.findOrFail(supplyEquipmentId);
        equipmentSuppliesDisassembler.copyToDomainModel(equipmentSupplyInput, supplyEquipmentCurrent);
        return equipmentSuppliesAssembler.toModel(supplyService.create(supplyEquipmentCurrent));

    }

}

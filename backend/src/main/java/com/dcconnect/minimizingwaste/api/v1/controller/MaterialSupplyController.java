package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.MaterialSupplyAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.MaterialSupplyDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.MaterialSupplyModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMaterialInput;
import com.dcconnect.minimizingwaste.domain.model.Material;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/supplies/materials")
public class MaterialSupplyController {

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private MaterialSupplyAssembler materialSupplyAssembler;

    @Autowired
    private MaterialSupplyDisassembler materialSupplyDisassembler;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public MaterialSupplyModel create(@RequestBody @Valid SupplyMaterialInput supplyMaterialInput) {
        Material material = materialSupplyDisassembler.toDomainObject(supplyMaterialInput);
        return materialSupplyAssembler.toModel(supplyService.create(material));

    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyMaterialId}")
    public MaterialSupplyModel update(
            @RequestBody @Valid SupplyMaterialInput supplyMaterialInput, @PathVariable Long supplyMaterialId) {

        Material supplyMaterialCurrent = (Material) supplyService.findOrFail(supplyMaterialId);
        materialSupplyDisassembler.copyToDomainModel(supplyMaterialInput, supplyMaterialCurrent);
        return materialSupplyAssembler.toModel(supplyService.create(supplyMaterialCurrent));

    }

}

package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyDetailedAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyMaterialDisassembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplySummaryAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplySummaryModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMaterialInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.SupplyControllerOpenApi;
import com.dcconnect.minimizingwaste.api.v1.openapi.SupplyMaterialControllerOpenApi;
import com.dcconnect.minimizingwaste.core.data.PageWrapper;
import com.dcconnect.minimizingwaste.core.data.PageableTranslator;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.SupplyFilter;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import com.dcconnect.minimizingwaste.infrastructure.spec.SupplySpecs;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "/v1/supplies/materials")
public class SupplyMaterialController implements SupplyMaterialControllerOpenApi {

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private SupplyMaterialDisassembler supplyMaterialDisassembler;

    @Autowired
    private SupplyDetailedAssembler supplyDetailedAssembler;

    @CheckSecurity.Supplies.CanEdit
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SupplyDetailedModel createMaterial(@RequestBody @Valid SupplyMaterialInput supplyMaterialInput){
        Supply supply = supplyMaterialDisassembler.toDomainObject(supplyMaterialInput);
        return supplyDetailedAssembler.toModel(supplyService.create(supply));
    }

    @CheckSecurity.Supplies.CanEdit
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyId}")
    public SupplyDetailedModel updateMaterial(@PathVariable Long supplyId, @RequestBody @Valid SupplyMaterialInput supplyMaterialInput){
        Supply supply =  supplyService.findOrFail(supplyId);
        supplyMaterialDisassembler.copyToDomainModel(supplyMaterialInput, supply);
        return supplyDetailedAssembler.toModel(supplyService.create(supply));
    }

}

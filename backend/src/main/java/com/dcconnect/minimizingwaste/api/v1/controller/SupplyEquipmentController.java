package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyDetailedAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyEquipmentDisassembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplySummaryAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplySummaryModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyEquipmentInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.SupplyControllerOpenApi;
import com.dcconnect.minimizingwaste.api.v1.openapi.SupplyEquipmentControllerOpenApi;
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
@RequestMapping(path = "/v1/supplies/equipments")
public class SupplyEquipmentController implements SupplyEquipmentControllerOpenApi {

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private SupplyEquipmentDisassembler supplyEquipmentDisassembler;

    @Autowired
    private SupplyDetailedAssembler supplyDetailedAssembler;


    @CheckSecurity.Supplies.CanEdit
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SupplyDetailedModel createEquipment(@RequestBody @Valid SupplyEquipmentInput supplyEquipmentInput){
        Supply supply = supplyEquipmentDisassembler.toDomainObject(supplyEquipmentInput);
        return supplyDetailedAssembler.toModel(supplyService.create(supply));
    }
    @CheckSecurity.Supplies.CanEdit
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{supplyId}")
    public SupplyDetailedModel updateEquipment(@PathVariable Long supplyId, @RequestBody @Valid SupplyEquipmentInput supplyEquipmentInput){
        Supply supply =  supplyService.findOrFail(supplyId);
        supplyService.nullifyManipulation(supply);
        supplyEquipmentDisassembler.copyToDomainModel(supplyEquipmentInput, supply);
        return supplyDetailedAssembler.toModel(supplyService.create(supply));
    }


}

package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyDetailedAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplySummaryAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplySummaryModel;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/v1/supplies")
public class SupplyController {

    @Autowired
    private SupplyRepository supplyRepository;

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private SupplySummaryAssembler supplySummaryAssembler;

    @Autowired
    private SupplyDetailedAssembler supplyDetailedAssembler;

    @Autowired
    private PagedResourcesAssembler<Supply> pagedResourcesAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PagedModel<SupplySummaryModel> all(@PageableDefault(size = 2) Pageable pageable){
        Page<Supply> supplies = supplyRepository.findAll(pageable);
        return pagedResourcesAssembler.toModel(supplies, supplySummaryAssembler);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{supplyId}")
    public void delete(@PathVariable Long supplyId){
        supplyService.delete(supplyId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{supplyId}")
    public SupplyDetailedModel findById(@PathVariable Long supplyId){
        Supply supply = supplyService.findOrFail(supplyId);
        return supplyDetailedAssembler.toModel(supply);
    }


}

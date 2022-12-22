package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesDetailedAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesSummaryAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailed;
import com.dcconnect.minimizingwaste.api.v1.model.SupplySummary;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/v1/supplies")
public class SupplyController {

    @Autowired
    private SupplyRepository supplyRepository;

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private SuppliesSummaryAssembler suppliesSummaryAssembler;

    @Autowired
    private SuppliesDetailedAssembler suppliesDetailedAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<SupplySummary> all(){
        List<Supply> supplies = supplyRepository.findAll();
        return suppliesSummaryAssembler.toCollectionModel(supplies);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{supplyId}")
    public void delete(@PathVariable Long supplyId){
        supplyService.delete(supplyId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{supplyId}")
    public SupplyDetailed findById(@PathVariable Long supplyId){
        Supply supply = supplyService.findOrFail(supplyId);
        return suppliesDetailedAssembler.toModel(supply);
    }


}

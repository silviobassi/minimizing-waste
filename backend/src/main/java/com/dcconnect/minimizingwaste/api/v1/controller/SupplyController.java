package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.SuppliesAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyModel;
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
    private SuppliesAssembler suppliesAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<SupplyModel> all(){
        List<Supply> supplies = supplyRepository.findAll();
        return suppliesAssembler.toCollectionModel(supplies);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{supplyId}")
    public void delete(@PathVariable Long supplyId){
        supplyService.delete(supplyId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{supplyId}")
    public SupplyModel findById(@PathVariable Long supplyId){
        Supply supply = supplyService.findOrFail(supplyId);
        return suppliesAssembler.toModel(supply);
    }


}

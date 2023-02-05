package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyDetailedAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SupplySummaryAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplySummaryModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.SupplyControllerOpenApi;
import com.dcconnect.minimizingwaste.core.data.PageWrapper;
import com.dcconnect.minimizingwaste.core.data.PageableTranslator;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.SupplyFilter;
import com.dcconnect.minimizingwaste.domain.service.SupplyService;
import com.dcconnect.minimizingwaste.infrastructure.spec.SupplySpecs;
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
@RequestMapping(path = "/v1/supplies")
public class SupplyController implements SupplyControllerOpenApi {

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

    @CheckSecurity.Supplies.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PagedModel<SupplySummaryModel> search(SupplyFilter supplyFilter,
                                                 @PageableDefault(size = 10) Pageable pageable){

        Pageable translatedPageable = pageableTranslate(pageable);

        Page<Supply> suppliesPage = supplyRepository.findAll(SupplySpecs.usingFilter(supplyFilter), translatedPageable);

        suppliesPage = new PageWrapper<>(suppliesPage, pageable);

        return pagedResourcesAssembler.toModel(suppliesPage, supplySummaryAssembler);
    }

    @CheckSecurity.Supplies.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{supplyId}")
    public void delete(@PathVariable Long supplyId){
        supplyService.delete(supplyId);
    }

    @CheckSecurity.Supplies.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{supplyId}")
    public SupplyDetailedModel findById(@PathVariable Long supplyId){
        Supply supply = supplyService.findOrFail(supplyId);
        return supplyDetailedAssembler.toModel(supply);
    }

    private Pageable pageableTranslate(Pageable apiPageable){
        var mapping = Map.of("name", "name");

        return PageableTranslator.translate(apiPageable, mapping);
    }

}

package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.ResourceUriHelper;
import com.dcconnect.minimizingwaste.api.v1.assembler.SectorAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.SectorDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.SectorModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.SectorInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.SectorControllerOpenApi;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import com.dcconnect.minimizingwaste.domain.repository.SectorRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.SectorFilter;
import com.dcconnect.minimizingwaste.domain.service.SectorService;
import com.dcconnect.minimizingwaste.infrastructure.spec.SectorSpecs;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/sectors")
public class SectorController implements SectorControllerOpenApi {

    @Autowired
    private SectorRepository sectorRepository;

    @Autowired
    private SectorService sectorService;

    @Autowired
    private SectorAssembler sectorAssembler;

    @Autowired
    private SectorDisassembler sectorDisassembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<SectorModel> search(SectorFilter sectorFilter){

        List<Sector> sectors = sectorRepository.findAll(SectorSpecs.usingFilter(sectorFilter));

        return sectorAssembler.toCollectionModel(sectors);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SectorModel create(@RequestBody @Valid SectorInput sectorInput){
        Sector sector = sectorDisassembler.toDomainObject(sectorInput);
        sector = sectorService.create(sector);
        ResourceUriHelper.addUriInResponseHeader(sector.getId());
        return sectorAssembler.toModel(sector);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{sectorId}")
    public SectorModel update(@PathVariable Long sectorId, @RequestBody @Valid SectorInput sectorInput) {
        Sector sectorCurrent = sectorService.findOrFail(sectorId);
        sectorDisassembler.copyToDomainModel(sectorInput, sectorCurrent);
        return sectorAssembler.toModel(sectorService.create(sectorCurrent));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{sectorId}")
    public void delete(@PathVariable Long sectorId){
        sectorService.delete(sectorId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{sectorId}")
    public SectorModel findOrFail(@PathVariable Long sectorId){
        return sectorAssembler.toModel(sectorService.findOrFail(sectorId));
    }

}

package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.WorkStationAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.WorkStationDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.WorkStationModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.WorkStationControllerOpenApi;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.WorkStationRepository;
import com.dcconnect.minimizingwaste.domain.service.WorkStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/work-stations")
public class WorkStationController implements WorkStationControllerOpenApi {

    @Autowired
    private WorkStationRepository workStationRepository;

    @Autowired
    private WorkStationService workStationService;

    @Autowired
    private WorkStationAssembler workStationAssembler;

    @Autowired
    private WorkStationDisassembler workStationDisassembler;

    @Autowired
    private PagedResourcesAssembler<WorkStation> pagedResourcesAssembler;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PagedModel<WorkStationModel> all(@PageableDefault(size = 10) Pageable pageable) {
        Page<WorkStation> workStationPage = workStationRepository.findAll(pageable);
        return pagedResourcesAssembler.toModel(workStationPage, workStationAssembler);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkStationModel create(@RequestBody @Valid WorkStationInput workStationInput){
        WorkStation workStation = workStationDisassembler.toDomainObject(workStationInput);
        workStation = workStationService.create(workStation);
        return workStationAssembler.toModel(workStation);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{workStationId}")
    public WorkStationModel update(@PathVariable Long workStationId, @RequestBody @Valid WorkStationInput workStationInput) {
        WorkStation workStationCurrent = workStationService.findOrFail(workStationId);
        workStationDisassembler.copyToDomainModel(workStationInput, workStationCurrent);
        return workStationAssembler.toModel(workStationService.create(workStationCurrent));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{workStationId}")
    public void delete(@PathVariable Long workStationId){
        workStationService.delete(workStationId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{workStationId}")
    public WorkStationModel findOrFail(@PathVariable Long workStationId){
        return workStationAssembler.toModel(workStationService.findOrFail(workStationId));
    }


}

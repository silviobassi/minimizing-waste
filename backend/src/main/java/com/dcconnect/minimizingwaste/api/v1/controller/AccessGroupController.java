package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AccessGroupAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.AccessGroupDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummaryModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AccessGroupInput;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.repository.AccessGroupRepository;
import com.dcconnect.minimizingwaste.domain.service.AccessGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/access-groups")
public class AccessGroupController {

    @Autowired
    private AccessGroupRepository accessGroupRepository;

    @Autowired
    private AccessGroupAssembler accessGroupAssembler;

    @Autowired
    private AccessGroupDisassembler accessGroupDisassembler;

    @Autowired
    private AccessGroupService accessGroupService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<AccessGroupSummaryModel> all() {
        List<AccessGroup> accessGroups = accessGroupRepository.findAll();
        return accessGroupAssembler.toCollectionModel(accessGroups);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AccessGroupSummaryModel create(@RequestBody @Valid AccessGroupInput accessGroupInput){
        AccessGroup accessGroup = accessGroupDisassembler.toDomainObject(accessGroupInput);
        accessGroup = accessGroupService.create(accessGroup);
        return accessGroupAssembler.toModel(accessGroup);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{accessGroupId}")
    public AccessGroupSummaryModel update(@PathVariable Long accessGroupId,
                                          @RequestBody @Valid AccessGroupInput accessGroupInput){
        AccessGroup accessGroupCurrent = accessGroupService.findOrFail(accessGroupId);
        accessGroupDisassembler.copyToDomainModel(accessGroupInput, accessGroupCurrent);
        accessGroupCurrent = accessGroupService.create(accessGroupCurrent);
        return accessGroupAssembler.toModel(accessGroupCurrent);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{accessGroupId}")
    public ResponseEntity<Void> delete(@PathVariable Long accessGroupId){
        accessGroupService.delete(accessGroupId);
        return ResponseEntity.noContent().build();
    }

}

package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.RoleAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.RoleDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.RoleDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.RoleInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.RoleControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.Role;
import com.dcconnect.minimizingwaste.domain.repository.RoleRepository;
import com.dcconnect.minimizingwaste.domain.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/roles")
public class RoleController implements RoleControllerOpenApi {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleAssembler roleAssembler;

    @Autowired
    private RoleDisassembler roleDisassembler;

    @Autowired
    private RoleService roleService;

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<RoleDetailedModel> all() {
        List<Role> roles = roleRepository.findAll();
        return roleAssembler.toCollectionModel(roles);
    }

    @CheckSecurity.Users.CanEdit
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoleDetailedModel create(@RequestBody @Valid RoleInput roleInput){
        Role role = roleDisassembler.toDomainObject(roleInput);
        role = roleService.create(role);
        return roleAssembler.toModel(role);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{roleId}")
    public RoleDetailedModel update(@PathVariable Long roleId,
                                    @RequestBody @Valid RoleInput roleInput){
        Role roleCurrent = roleService.findOrFail(roleId);
        roleDisassembler.copyToDomainModel(roleInput, roleCurrent);
        roleCurrent = roleService.create(roleCurrent);
        return roleAssembler.toModel(roleCurrent);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{roleId}")
    public ResponseEntity<Void> delete(@PathVariable Long roleId){
        roleService.delete(roleId);
        return ResponseEntity.noContent().build();
    }

}

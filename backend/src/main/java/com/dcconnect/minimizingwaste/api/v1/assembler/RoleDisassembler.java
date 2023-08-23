package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.RoleInput;
import com.dcconnect.minimizingwaste.domain.model.Role;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Role toDomainObject(RoleInput roleInput) {
        return modelMapper.map(roleInput, Role.class);
    }

    public void copyToDomainModel(RoleInput roleInput, Role role) {
        modelMapper.map(roleInput, role);
    }

}

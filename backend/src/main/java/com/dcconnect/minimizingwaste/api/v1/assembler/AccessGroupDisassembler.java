package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.AccessGroupInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.SectorInput;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccessGroupDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public AccessGroup toDomainObject(AccessGroupInput accessGroupInput) {
        return modelMapper.map(accessGroupInput, AccessGroup.class);
    }

    public void copyToDomainModel(AccessGroupInput accessGroupInput, AccessGroup accessGroup) {
        modelMapper.map(accessGroupInput, accessGroup);
    }

}

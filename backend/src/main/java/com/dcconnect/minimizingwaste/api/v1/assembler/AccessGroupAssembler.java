package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummary;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AccessGroupAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public AccessGroupSummary toModel(AccessGroup accessGroup){
        return modelMapper.map(accessGroup, AccessGroupSummary
                .class);
    }

    public List<AccessGroupSummary> toCollectionModel(List<AccessGroup> accessGroups){
        return accessGroups.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

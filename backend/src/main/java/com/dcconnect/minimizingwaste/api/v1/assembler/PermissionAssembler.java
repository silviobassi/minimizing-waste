package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailed;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class PermissionAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public PermissionDetailed toModel(Permission permission){
        return modelMapper.map(permission, PermissionDetailed
                .class);
    }

    public List<PermissionDetailed> toCollectionModel(List<Permission> permissions){
        return permissions.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}

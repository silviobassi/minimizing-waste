package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.PermissionNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.PermissionRepository;
import com.dcconnect.minimizingwaste.domain.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    public Permission findOrFail(Long permissionId){
        return permissionRepository.findById(permissionId).
                orElseThrow(() -> new PermissionNotFoundException(permissionId));
    }


}

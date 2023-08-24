package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolePermissionService {

    @Autowired
    private RoleService roleService;

    @Autowired
    private PermissionRepository permissionRepository;

    public List<Permission> findAllNotGranted(Long roleId){
        roleService.findOrFail(roleId);
        return permissionRepository.findAllNotGranted(roleId);
    }

    public List<Permission> findAllGranted(Long roleId){
        roleService.findOrFail(roleId);
        return permissionRepository.findAllGranted(roleId);
    }

}

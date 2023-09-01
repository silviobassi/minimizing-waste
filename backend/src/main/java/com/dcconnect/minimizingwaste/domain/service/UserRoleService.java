package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.model.Role;
import com.dcconnect.minimizingwaste.domain.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleService {


    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> findAllNotGranted(Long userId){
        userService.findOrFail(userId);
        return roleRepository.findAllNotGranted(userId);
    }

    public List<Role> findAllGranted(Long userId){
        userService.findOrFail(userId);
        return roleRepository.findAllGranted(userId);
    }

}

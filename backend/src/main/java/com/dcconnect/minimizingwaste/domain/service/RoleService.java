package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.RoleNotFoundException;
import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.exception.EntityInUseException;
import com.dcconnect.minimizingwaste.domain.model.Role;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class RoleService {

    public static final String ACCESS_GROUP_IN_USE =
            "Role de código %d não pode ser removido, pois está em uso";
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionService permissionService;

    @Transactional
    public Role create(Role role){
        return roleRepository.save(role);
    }

    @Transactional
    public void delete(Long roleId) {
        try {
            roleRepository.deleteById(roleId);
            roleRepository.flush();
        } catch (EmptyResultDataAccessException e) {
            throw new RoleNotFoundException(roleId);
        } catch (DataIntegrityViolationException e) {
            throw new EntityInUseException(
                    String.format(ACCESS_GROUP_IN_USE, roleId));
        }
    }

    @Transactional
    public void disassociatePermission(Long roleId, Long permissionId) {
        Role role = findOrFail(roleId);
        Permission permission = permissionService.findOrFail(permissionId);

        if(role.isNotPermission(permission)){
            throw new BusinessException(
                    String.format("A permissão não está associada ao nível de acesso %s", role.getName()));
        }

        role.removePermission(permission);
    }

    @Transactional
    public void associatePermission(Long roleId, Long permissionId){
        Role role = findOrFail(roleId);
        Permission permission = permissionService.findOrFail(permissionId);

        if(role.isPermission(permission)){
            throw new BusinessException(
                    String.format("A permissão já está associada ao nível de acesso %s", role.getName()));
        }

        role.addPermission(permission);
    }

    public Role findOrFail(Long roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() -> new RoleNotFoundException(roleId));
    }


}

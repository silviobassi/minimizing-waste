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
            "Grupo de código %d não pode ser removido, pois está em uso";
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionService permissionService;

    @Transactional
    public Role create(Role role){
        return roleRepository.save(role);
    }

    @Transactional
    public void delete(Long accessGroupId) {
        try {
            roleRepository.deleteById(accessGroupId);
            roleRepository.flush();
        } catch (EmptyResultDataAccessException e) {
            throw new RoleNotFoundException(accessGroupId);
        } catch (DataIntegrityViolationException e) {
            throw new EntityInUseException(
                    String.format(ACCESS_GROUP_IN_USE, accessGroupId));
        }
    }

    @Transactional
    public void disassociatePermission(Long accessGroupId, Long permissionId) {
        Role role = findOrFail(accessGroupId);
        Permission permission = permissionService.findOrFail(permissionId);

        List<Permission> permissionMatches = getPermissionMatches(role, permission);

        if(permissionMatches.isEmpty()){
            throw new BusinessException(
                    String.format("A permissão não está associada ao nível de acesso %s", role.getName()));
        }

        role.removePermission(permission);
    }

    @Transactional
    public void associatePermission(Long accessGroupId, Long permissionId){
        Role role = findOrFail(accessGroupId);
        Permission permission = permissionService.findOrFail(permissionId);

        List<Permission> permissionMatches = getPermissionMatches(role, permission);

        if(!permissionMatches.isEmpty()){
            throw new BusinessException(
                    String.format("A permissão já está associada ao nível de acesso %s", role.getName()));
        }

        role.addPermission(permission);
    }

    public Role findOrFail(Long accessGroupId) {
        return roleRepository.findById(accessGroupId)
                .orElseThrow(() -> new RoleNotFoundException(accessGroupId));
    }

    private static List<Permission> getPermissionMatches(Role role, Permission permission) {
        var permissionDoNotMatch = role.getPermissions().stream()
                .filter((permissionCurrent) -> permissionCurrent.equals(permission)).toList();
        return permissionDoNotMatch;
    }
}

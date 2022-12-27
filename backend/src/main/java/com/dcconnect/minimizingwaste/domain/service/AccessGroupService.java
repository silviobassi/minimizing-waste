package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.AccessGroupNotFoundException;
import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.exception.EntityInUseException;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.AccessGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AccessGroupService {

    public static final String ACCESS_GROUP_IN_USE =
            "Grupo de código %d não pode ser removido, pois está em uso";
    @Autowired
    private AccessGroupRepository accessGroupRepository;

    @Autowired
    private PermissionService permissionService;

    @Transactional
    public AccessGroup create(AccessGroup accessGroup){
        return accessGroupRepository.save(accessGroup);
    }

    @Transactional
    public void delete(Long accessGroupId) {
        try {
            accessGroupRepository.deleteById(accessGroupId);
            accessGroupRepository.flush();
        } catch (EmptyResultDataAccessException e) {
            throw new AccessGroupNotFoundException(accessGroupId);
        } catch (DataIntegrityViolationException e) {
            throw new EntityInUseException(
                    String.format(ACCESS_GROUP_IN_USE, accessGroupId));
        }
    }

    @Transactional
    public void disassociatePermission(Long accessGroupId, Long permissionId) {
        AccessGroup accessGroup = findOrFail(accessGroupId);
        Permission permission = permissionService.findOrFail(permissionId);

        List<Permission> permissionMatches = getPermissionMatches(accessGroup, permission);

        if(permissionMatches.isEmpty()){
            throw new BusinessException(
                    String.format("A permissão não está associada ao grupo de acesso %s", accessGroup.getName()));
        }

        accessGroup.removePermission(permission);
    }

    @Transactional
    public void associatePermission(Long accessGroupId, Long permissionId){
        AccessGroup accessGroup = findOrFail(accessGroupId);
        Permission permission = permissionService.findOrFail(permissionId);

        List<Permission> permissionMatches = getPermissionMatches(accessGroup, permission);

        if(!permissionMatches.isEmpty()){
            throw new BusinessException(
                    String.format("A permissão já está associada ao grupo de acesso %s", accessGroup.getName()));
        }

        accessGroup.addPermission(permission);
    }

    public AccessGroup findOrFail(Long accessGroupId) {
        return accessGroupRepository.findById(accessGroupId)
                .orElseThrow(() -> new AccessGroupNotFoundException(accessGroupId));
    }

    private static List<Permission> getPermissionMatches(AccessGroup accessGroup, Permission permission) {
        var permissionDoNotMatch = accessGroup.getPermissions().stream()
                .filter((permissionCurrent) -> permissionCurrent.equals(permission)).toList();
        return permissionDoNotMatch;
    }
}

package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.AccessGroupNotFoundException;
import com.dcconnect.minimizingwaste.domain.exception.EntityInUseException;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.AccessGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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
        accessGroup.removePermission(permission);
    }
    @Transactional
    public void associatePermission(Long accessGroupId, Long permissionId){
        AccessGroup accessGroup = findOrFail(accessGroupId);
        Permission permission = permissionService.findOrFail(permissionId);
        accessGroup.addPermission(permission);
    }

    public AccessGroup findOrFail(Long accessGroupId) {
        return accessGroupRepository.findById(accessGroupId)
                .orElseThrow(() -> new AccessGroupNotFoundException(accessGroupId));
    }
}

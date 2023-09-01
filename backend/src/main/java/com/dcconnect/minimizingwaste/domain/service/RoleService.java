package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.RoleNotFoundException;
import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.exception.EntityInUseException;
import com.dcconnect.minimizingwaste.domain.model.Role;
import com.dcconnect.minimizingwaste.domain.model.Permission;
import com.dcconnect.minimizingwaste.domain.repository.RoleRepository;
import jakarta.persistence.LockModeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RoleService {

    public static final String ROLE_IN_USE =
            "Role de código %d não pode ser removido, pois está em uso";
    public static final String CANNOT_BE_EXCLUDED = "O Administrador não pode ser excluído";
    public static final String ASSIGNED_PERMISSION_ALREADY = "A permissão já está associada ao nível de acesso %s";

    public static final String UNASSIGNED_PERMISSION_ALREADY = "A permissão está disassociada ao nível de acesso %s";
    public static final String PERMISSIONS_CANNOT_BE_UNASSIGNED = "A permissão de Administrador não podem ser revogada";

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionService permissionService;

    @Transactional
    public Role create(Role role){

        Optional<Role> roleCurrent = roleRepository.findByName(role.getName());

        if(roleCurrent.isPresent() && !roleCurrent.get().equals(role)){
            throw new BusinessException(
                    String.format("Já existe um perfil de acesso cadastrado com o nome %s", role.getName()));
        }

        return roleRepository.save(role);

    }

    @Transactional
    public void delete(Long roleId) {
        Role roleCurrent = findOrFail(roleId);

        if(roleCurrent.getName().equals("Administrador"))
            throw new BusinessException(CANNOT_BE_EXCLUDED);

        try {
            roleRepository.deleteById(roleId);
            roleRepository.flush();
        } catch (EmptyResultDataAccessException e) {
            throw new RoleNotFoundException(roleId);
        } catch (DataIntegrityViolationException e) {
            throw new EntityInUseException(
                    String.format(ROLE_IN_USE, roleId));
        }
    }

    @Transactional
    public void disassociatePermission(Long roleId, Long permissionId) {

        Role role = findOrFail(roleId);
        Permission permission = permissionService.findOrFail(permissionId);

        if(role.getName().equals("Administrador"))
            throw new BusinessException(
                    String.format(PERMISSIONS_CANNOT_BE_UNASSIGNED, role.getName()));


        if(role.isNotPermission(permission)){
            throw new BusinessException(
                    String.format(UNASSIGNED_PERMISSION_ALREADY, role.getName()));
        }

        role.removePermission(permission);
    }

    @Transactional
    public void associatePermission(Long roleId, Long permissionId){
        Role role = findOrFail(roleId);
        Permission permission = permissionService.findOrFail(permissionId);

        if(role.isPermission(permission)){
            throw new BusinessException(
                    String.format(ASSIGNED_PERMISSION_ALREADY, role.getName()));
        }

        role.addPermission(permission);
    }

    public Role findOrFail(Long roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() -> new RoleNotFoundException(roleId));
    }


}

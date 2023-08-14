package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.exception.EntityInUseException;
import com.dcconnect.minimizingwaste.domain.exception.UserNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccessGroupService accessGroupService;

    @Autowired
    private FileAvatarStorageService fileAvatarStorageService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static final String USER_IN_USE = "Colaborador de código %d não pode ser removido, pois está em uso";
    @Transactional
    public User create(User user){
        userRepository.detach(user);
        Optional<User> currentUserByEmail = userRepository.findByEmail(user.getEmail());
        Optional<User> currentUserByCpf = userRepository.findByCpf(user.getCpf());

        existsEmailAndCpf(user, currentUserByEmail, currentUserByCpf);

        fileAvatarStorageService.removeIfExistingOldAvatar(user);

        insertOrUpdatePassword(user);

        return userRepository.save(user);
    }

    @Transactional
    public void delete(User user){
        try {
            fileAvatarStorageService.removeIfExistingOldAvatar(user);

            userRepository.delete(user);
            userRepository.flush();
        } catch (DataIntegrityViolationException e){
            throw new EntityInUseException(
                    String.format(USER_IN_USE, user.getId()));
        }
    }

    @Transactional
    public void changePassword(Long userId, String currentPassword, String newPassword){
        User user = findOrFail(userId);

        if(!passwordEncoder.matches(currentPassword, user.getPassword())){
            throw new BusinessException("Senha atual informada não coincide com a senha do usuário.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
    }

    @Transactional
    public void disassociateAccessGroup(Long userId, Long accessGroupId){
        User user = findOrFail(userId);
        AccessGroup accessGroup = accessGroupService.findOrFail(accessGroupId);

        List<AccessGroup> accessGroupsMatches = getAccessGroupsMatches(user, accessGroup);

        if(accessGroupsMatches.isEmpty()){
            throw new BusinessException(
                    String.format("O Grupo de Acesso não está associado ao usuário %s", user.getName()));
        }

        user.removeAccessGroup(accessGroup);
    }

    @Transactional
    public void associateAccessGroup(Long userId, Long accessGroupId){
        User user = findOrFail(userId);
        AccessGroup accessGroup = accessGroupService.findOrFail(accessGroupId);
        List<AccessGroup> accessGroupsMatches = getAccessGroupsMatches(user, accessGroup);

        if(!accessGroupsMatches.isEmpty()){
            throw new BusinessException(
                    String.format("O Grupo de Acesso já está associado ao usuário %s", user.getName()));
        }

        user.addAccessGroups(accessGroup);
    }

    private List<AccessGroup> getAccessGroupsMatches(User user, AccessGroup accessGroup) {
        var accessGroupsMatchers = user.getAccessGroups().stream()
                .filter((accessGroupCurrent) -> accessGroupCurrent.equals(accessGroup)).toList();
        return accessGroupsMatchers;
    }

    public User findOrFail(Long userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    private void insertOrUpdatePassword(User user) {

        if(user.isNew()){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        if(user.isCurrent()){
            user.setPassword(user.getPassword());
        }
    }

    private void existsEmailAndCpf(User user, Optional<User> currentUserByEmail, Optional<User> currentUserByCpf) {
        if(currentUserByCpf.isPresent() && !currentUserByCpf.get().equals(user)){
            throw new BusinessException(
                    String.format("Já existe um usuário cadastrado com o cpf %s", user.getCpf()));
        }

        if(currentUserByEmail.isPresent() && !currentUserByEmail.get().equals(user)){
            throw new BusinessException(
                    String.format("Já existe um usuário cadastrado com o email %s", user.getEmail()));
        }
    }

}

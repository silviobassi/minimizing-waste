package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.exception.UserNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccessGroupService accessGroupService;

    @Transactional
    public User create(User user){
        userRepository.detach(user);

        Optional<User> currentUser = userRepository.findByEmail(user.getEmail());

        if(currentUser.isPresent() && !currentUser.get().equals(user)){
            throw new BusinessException(
                    String.format("Já existe um usuário cadastrado com o e-mail %s", user.getEmail()));
        }

        return userRepository.save(user);
    }

    @Transactional
    public void changePassword(Long userId, String currentPassword, String newPassword){
        User user = findOrFail(userId);

        if(user.passwordDoesNotMatch(currentPassword)){
            throw new BusinessException("Senha atual informada não coincide com a senha do usuário.");
        }

        user.setPassword(newPassword);
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

}

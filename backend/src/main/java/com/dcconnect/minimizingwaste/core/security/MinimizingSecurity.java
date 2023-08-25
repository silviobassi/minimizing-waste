package com.dcconnect.minimizingwaste.core.security;

import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
public class MinimizingSecurity {


    @Autowired
    private AssignmentRepository assignmentRepository;
    @Autowired
    private UserRepository userRepository;

    public Authentication getAuthentication(){
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public Long getUserId(){
        Jwt jwt = (Jwt) getAuthentication().getPrincipal();
        return Long.parseLong(jwt.getClaim("user_id"));
    }

    public boolean hasAuthority(String authorityName) {
        return getAuthentication().getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals(authorityName));
    }

    public boolean isScopeWrite(){
        return hasAuthority("SCOPE_WRITE");
    }
    public boolean isScopeRead(){
        return hasAuthority("SCOPE_READ");
    }
    public boolean hasAssignmentResponsible(Long assignmentId){
        if(assignmentId == null) {
            return false;
        }
        return assignmentRepository.existsByEmployeeResponsible(assignmentId, getUserId());
    }


    public boolean hasUserLogin(Long userId){
        if(userId == null)
            return false;
        return userRepository.existsByUser(userId);
    }

    public boolean canCompleteAssignments(Long assignmentId){
        return isScopeWrite() && (hasAuthority("COMPLETE_ASSIGNMENTS")
                || hasAssignmentResponsible(assignmentId));
    }

    public boolean canConsultAssignments(Long assignmentId){
        return isScopeRead() && (hasAuthority("CONSULT_ASSIGNMENTS")
                || hasAssignmentResponsible(assignmentId));
    }


    public boolean canConsultUserLogin(Long userId){
        return isScopeRead() && (hasAuthority("CONSULT_USER")
                || hasUserLogin(userId));
    }

    public boolean userEqualAuthenticated(Long userId) {
        return getUserId() != null && userId != null
                && !getUserId().equals(userId);
    }

}

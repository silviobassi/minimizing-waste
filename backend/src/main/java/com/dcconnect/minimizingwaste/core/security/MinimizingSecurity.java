package com.dcconnect.minimizingwaste.core.security;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
public class MinimizingSecurity {


    @Autowired
    private AssignmentRepository assignmentRepository;
    public Authentication getAuthentication(){
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public Long getUserId(){
        Jwt jwt = (Jwt) getAuthentication().getPrincipal();
        return Long.parseLong(jwt.getClaim("user_id"));
    }

    public boolean assignmentResponsible(Long assignmentId){
        return assignmentRepository.existsByEmployeeResponsible(assignmentId, getUserId());
    }
}

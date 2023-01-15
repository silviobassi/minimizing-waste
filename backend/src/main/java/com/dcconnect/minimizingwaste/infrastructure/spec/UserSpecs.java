package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.filter.UserFilter;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;

public class UserSpecs {

    public static Specification<User> usingFilter(UserFilter userFilter){
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if(userFilter.getUserName() != null) {
                predicates.add(criteriaBuilder.like(root.get("name"), userFilter.getUserName()+"%"));
            }

            if(userFilter.getUserCpf() != null) {
                predicates.add(criteriaBuilder.like(root.get("cpf"), userFilter.getUserCpf()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}

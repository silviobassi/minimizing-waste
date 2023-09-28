package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.filter.UserFilter;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Collection;

public class UserSpecs {

    public static Specification<User> usingFilter(UserFilter userFilter){
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if(userFilter.getUserName() != null) {
                predicates.add(criteriaBuilder.like(root.get("name"), userFilter.getUserName()+"%"));
            }

            if(userFilter.getUserCpf() != null) {
                predicates.add(criteriaBuilder.like(root.get("cpf"), userFilter.getUserCpf()+"%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<User> userAssignedAssignmentId(final long assignmentId) {
        return (root, query, builder) -> {
            query.distinct(true);
            Root<Assignment> assignment = query.from(Assignment.class);
            Expression<Collection<User>> assignmentUser = assignment.get("employeesResponsible");
            return builder.and(builder.equal(assignment.get("id"), assignmentId), builder.isMember(root, assignmentUser));
        };
    }

    public static Specification<User> userUnassignedAssignmentId(final long assignmentId) {
        return (root, query, builder) -> {
            query.distinct(true);
            Root<Assignment> assignment = query.from(Assignment.class);
            Expression<Collection<User>> assignmentUser = assignment.get("employeesResponsible");
            return builder.and(builder.equal(assignment.get("id"), assignmentId), builder.isNotMember(root, assignmentUser));
        };
    }

}

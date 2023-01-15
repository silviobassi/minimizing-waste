package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentFilter;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;

public class AssignmentSpecs {

    public static Specification<Assignment> usingFilter(AssignmentFilter assignmentFilter){
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if(assignmentFilter.getAssignmentTitle() != null) {
                predicates.add(criteriaBuilder.like(root.get("title"), assignmentFilter.getAssignmentTitle()+"%"));
            }
            if(assignmentFilter.getStartDate() != null && assignmentFilter.getEndDate() != null){
                predicates.add(criteriaBuilder.between(root.get("startDate"),
                        assignmentFilter.getStartDate(), assignmentFilter.getEndDate()));
            }
            if(assignmentFilter.getStartDate() != null && assignmentFilter.getDeadline() != null){
                predicates.add(criteriaBuilder.between(root.get("deadline"),
                        assignmentFilter.getStartDate(), assignmentFilter.getDeadline()));
            }
            if(assignmentFilter.getCompleted() != null){
                predicates.add(criteriaBuilder.equal(root.get("completed"), assignmentFilter.getCompleted()));
            }
            if(assignmentFilter.getApproved() != null){
                predicates.add(criteriaBuilder.equal(root.get("approved"), assignmentFilter.getApproved()));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}

package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentFilter;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

import java.time.OffsetDateTime;
import java.util.ArrayList;

public class AssignmentSpecs {

    public static Specification<Assignment> usingFilter(AssignmentFilter assignmentFilter){
        return (root, query, builder) -> {
            var predicates = new ArrayList<Predicate>();


            if(assignmentFilter.getAssignmentTitle() != null) {
                predicates.add(builder.like(root.get("title"), assignmentFilter.getAssignmentTitle()+"%"));
            }
            if(assignmentFilter.getStartDate() != null && assignmentFilter.getEndDate() != null){
                predicates.add(builder.between(root.get("startDate"), assignmentFilter.getStartDate(),
                        assignmentFilter.getEndDate()));


            }
            if(assignmentFilter.getStartDate() != null && assignmentFilter.getDeadline() != null){
                predicates.add(builder.and(builder.between(root.get("deadline"),
                                assignmentFilter.getStartDate(), assignmentFilter.getDeadline()),
                        builder.isNotNull(root.get("deadline"))));
            }



            if(assignmentFilter.getCompleted() != null){
                predicates.add(builder.equal(root.get("completed"), assignmentFilter.getCompleted()));
            }
            if(assignmentFilter.getApproved() != null){
                predicates.add(builder.equal(root.get("approved"), assignmentFilter.getApproved()));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
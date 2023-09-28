package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.*;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentFilter;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Collection;

public class AssignmentSpecs {

    public static Specification<Assignment> usingFilter(AssignmentFilter assignmentFilter) {
        return (root, query, builder) -> {


            var predicates = new ArrayList<Predicate>();
            if (assignmentFilter.getAssignmentTitle() != null) {
                predicates.add(builder.like(root.get("title"), assignmentFilter.getAssignmentTitle() + "%"));
            }
            if (assignmentFilter.getStartDate() != null && assignmentFilter.getEndDate() != null) {
                predicates.add(builder.and(builder.between(root.get("endDate"), assignmentFilter.getStartDate(),
                        assignmentFilter.getEndDate()), builder.isNotNull(root.get("endDate"))));
            }

            if (assignmentFilter.getStartDate() != null && assignmentFilter.getApproveDate() != null) {
                predicates.add(builder.and(builder.between(root.get("approveDate"), assignmentFilter.getStartDate(),
                        assignmentFilter.getApproveDate()), builder.isNotNull(root.get("approveDate"))));
            }
            if (assignmentFilter.getStartDate() != null && assignmentFilter.getDeadline() != null) {
                predicates.add(builder.between(root.get("deadline"),
                        assignmentFilter.getStartDate(), assignmentFilter.getDeadline()));
            }

            if (assignmentFilter.getCompleted() != null) {
                predicates.add(builder.equal(root.get("completed"), assignmentFilter.getCompleted()));
            }
            if (assignmentFilter.getApproved() != null) {
                predicates.add(builder.equal(root.get("approved"), assignmentFilter.getApproved()));
            }

            if (assignmentFilter.getResponsibleName() != null) {
                predicates.add(builder.like(root.join("employeesResponsible").get("name"),
                        assignmentFilter.getResponsibleName() + "%"));
            }

            if (assignmentFilter.getResponsibleCpf() != null) {
                predicates.add(builder.like(root.join("employeesResponsible").get("cpf"),
                        assignmentFilter.getResponsibleCpf() + "%"));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Assignment> assignmentsUnassignedAssignment() {
        return (root, query, builder) ->  builder.isEmpty(root.get("employeesResponsible"));
    }

    public static Specification<Assignment> assignmentsAssignedAssignment() {
        return (root, query, builder) -> builder.isNotEmpty(root.get("employeesResponsible"));
    }

}
package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.Assignment_;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.User_;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentFilter;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class AssignmentSpecs {

    public static Specification<Assignment> usingFilter(AssignmentFilter assignmentFilter){
        return (root, query, builder) -> {
            var predicates = new ArrayList<Predicate>();

            Join<Assignment, User> employeeResponsible = root.join(Assignment_.EMPLOYEES_RESPONSIBLE, JoinType.RIGHT);

            if(assignmentFilter.getAssignmentTitle() != null) {
                predicates.add(builder.like(root.get("title"), assignmentFilter.getAssignmentTitle()+"%"));
            }
            if(assignmentFilter.getStartDate() != null && assignmentFilter.getEndDate() != null){
                predicates.add(builder.and(builder.between(root.get("endDate"), assignmentFilter.getStartDate(),
                        assignmentFilter.getEndDate()), builder.isNotNull(root.get("endDate"))));
            }

            if(assignmentFilter.getStartDate() != null && assignmentFilter.getApproveDate() != null){
                predicates.add(builder.and(builder.between(root.get("approveDate"), assignmentFilter.getStartDate(),
                        assignmentFilter.getApproveDate()), builder.isNotNull(root.get("approveDate"))));
            }
            if(assignmentFilter.getStartDate() != null && assignmentFilter.getDeadline() != null){
                predicates.add(builder.between(root.get("deadline"),
                        assignmentFilter.getStartDate(), assignmentFilter.getDeadline()));
            }


            if(assignmentFilter.getCompleted() != null){
                predicates.add(builder.equal(root.get("completed"), assignmentFilter.getCompleted()));
            }
            if(assignmentFilter.getApproved() != null){
                predicates.add(builder.equal(root.get("approved"), assignmentFilter.getApproved()));
            }


            if(assignmentFilter.getResponsibleName() != null) {
                predicates.add(builder.like(employeeResponsible.get(User_.name),
                        assignmentFilter.getResponsibleName()+"%"));
            }

            if(assignmentFilter.getResponsibleCpf() != null) {
                predicates.add(builder.like(employeeResponsible.get(User_.cpf),
                        assignmentFilter.getResponsibleCpf()+"%"));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
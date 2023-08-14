package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.Notification;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentNotificationFilter;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.OffsetDateTime;
import java.util.ArrayList;

public class AssignmentNotificationSpecs {

    public static Specification<Assignment> usingFilter(AssignmentNotificationFilter assignmentNotificationFilter){
        return (root, query, builder) -> {
            var predicates = new ArrayList<Predicate>();

            if(assignmentNotificationFilter.getCompleted() != null) {
                predicates.add(builder.equal(root.get("completed"), assignmentNotificationFilter.getCompleted()));
            }
            if(assignmentNotificationFilter.getApproved() != null) {
                predicates.add(builder.equal(root.get("approved"), assignmentNotificationFilter.getApproved()));
            }

            if(assignmentNotificationFilter.getCurrentDate() != null) {
                predicates.add(builder.lessThan(root.get("deadline"), assignmentNotificationFilter.getCurrentDate()));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }


}

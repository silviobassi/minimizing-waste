package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.Notification;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentNotificationFilter;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;

public class AssignmentNotificationSpecs {

    public static Specification<Assignment> usingFilter(AssignmentNotificationFilter assignmentNotificationFilter){
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();
            Join<Notification, Assignment> notificationJoin = root.join("notification");

            if(assignmentNotificationFilter.getCompleted() != null) {
                predicates.add(criteriaBuilder.equal(root.get("completed"), assignmentNotificationFilter.getCompleted()));
            }
            if(assignmentNotificationFilter.getApproved() != null) {
                predicates.add(criteriaBuilder.equal(root.get("approved"), assignmentNotificationFilter.getApproved()));
            }

            if(assignmentNotificationFilter.getCurrentDate() != null) {
                predicates.add(criteriaBuilder.lessThan(root.get("deadline"), assignmentNotificationFilter.getCurrentDate()));
            }

            if(assignmentNotificationFilter.getCurrentDate() != null) {
                predicates.add(criteriaBuilder.lessThan(root.get("deadline"), assignmentNotificationFilter.getCurrentDate()));
            }

            if(assignmentNotificationFilter.getAttach() != null
                    && assignmentNotificationFilter.getAttach().equals("available")) {
                predicates.add(criteriaBuilder.isTrue(notificationJoin.isNotNull()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}

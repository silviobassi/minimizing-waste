package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssignmentRepository extends CustomJpaRepository<Assignment, Long> {

    @Query("select a from Assignment a join fetch a.notification n")
    List<Assignment> findNotificationByAttachAssignment();

    @Query("select a from Assignment a join fetch a.notification n where a.completed = true")
    List<Assignment> findNotificationByCompletedAssignment();

    @Query("select a from Assignment a join fetch a.notification n where a.approved = true")
    List<Assignment> findNotificationByApprovedAssignment();

    @Query("select a from Assignment a join fetch a.notification n where a.approved = false and a.completed = true")
    List<Assignment> findNotificationByDisapprovedAssignment();

    @Query("select a from Assignment a join fetch a.notification n where a.endDate < CURRENT_DATE")
    List<Assignment> findNotificationByExpiredAssignment();

}
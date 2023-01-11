package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentNotificationFilter;
import com.dcconnect.minimizingwaste.infrastructure.spec.AssignmentNotificationSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssignmentRepository extends CustomJpaRepository<Assignment, Long>,
        JpaSpecificationExecutor<Assignment> {

    @EntityGraph(attributePaths = {"workStation.sector", "notification"})
    Page<Assignment> findAll(Specification<Assignment> specification, Pageable pageable);
}
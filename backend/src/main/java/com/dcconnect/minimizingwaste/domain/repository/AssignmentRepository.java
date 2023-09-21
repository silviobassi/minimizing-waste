package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface AssignmentRepository extends CustomJpaRepository<Assignment, Long>,
        JpaSpecificationExecutor<Assignment> {

    @Override
    @EntityGraph(attributePaths = {"workStation.sector", "notification"})
    Page<Assignment> findAll(Specification<Assignment> specification, Pageable pageable);


    @Override
    List<Assignment> findAll(Specification<Assignment> specification);

    @Query(value = "select a from Assignment a join fetch a.workStation ws join fetch ws.sector join fetch a.notification " +
            "where a.employeesResponsible is not empty order by a.id", countQuery = "select count(a) from Assignment a " +
            "join a.workStation ws join ws.sector join a.notification where a.employeesResponsible is not empty order by a.id")
    Page<Assignment> findAllAssigned(Pageable pageable);


    @Query(value = "select a from Assignment a join fetch a.workStation ws join fetch ws.sector join fetch a.notification " +
            "where a.employeesResponsible is empty order by a.id", countQuery = "select count(a) from Assignment a " +
            "join a.workStation ws join ws.sector join a.notification where a.employeesResponsible is empty order by a.id")
    Page<Assignment> findAllUnassigned(Pageable pageable);

    @Query("select case when count(1) > 0 then true else false end from Assignment at " +
            "join at.employeesResponsible er where at.id = :assignmentId and er.id = :userId")
    boolean existsByEmployeeResponsible(Long assignmentId, Long userId);

}
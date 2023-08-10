package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends CustomJpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    @EntityGraph(attributePaths = {"accessGroups"})
    Page<User> findAll(Specification<User> specification, Pageable pageable);


    @Query(value = "select u from User u where u not in (select ae.employeesResponsible from Assignment ae where ae.id = :assignmentId)",
            countQuery = "select count(u) from User u where u not in (select ae.employeesResponsible from Assignment ae where ae.id = :assignmentId)")

    Page<User> findAllUserAssignmentsAssigned(Pageable pageable, @Param("assignmentId") Long assignmentId);

    @Query(value = "from User u where u in (select ae.employeesResponsible from Assignment ae where ae.id = :assignmentId)",
    countQuery = "select count(u) from User u where u in (select ae.employeesResponsible from Assignment ae where ae.id = :assignmentId)")
    Page<User> findAllUserNotAssignmentsAssigned(Pageable pageable, @Param("assignmentId") Long assignmentId);

    Optional<User> findByEmail(String email);
    Optional<User> findByCpf(String cpf);

}
package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends UserRepositoryQueries, CustomJpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    @EntityGraph(attributePaths = {"accessGroups"})
    Page<User> findAll(Specification<User> specification, Pageable pageable);

    @Query(value = "select u.* from users u where u.id " +
            "not in (select ae.responsible_employee_id from " +
            "assignments_employees ae where ae.assignment_id = :assignmentId);", nativeQuery = true)
    Page<User> findAllUserAssignmentsAssigned(Pageable pageable, @Param("assignmentId") Long assignmentId);

    @Query(value = "select u.* from users u where u.id " +
            "in (select ae.responsible_employee_id from " +
            "assignments_employees ae where ae.assignment_id = :assignmentId);", nativeQuery = true)
    Page<User> findAllUserNotAssignmentsAssigned(Pageable pageable, @Param("assignmentId") Long assignmentId);

    Optional<User> findByEmail(String email);
    Optional<User> findByCpf(String cpf);

    @Query("select f from UserPhoto f where f.user.id = :userId")
    Optional<UserPhoto> findPhotoById(@Param("userId") Long userId);

}
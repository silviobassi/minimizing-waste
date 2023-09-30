package com.dcconnect.minimizingwaste.domain.repository;

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

public interface UserRepository extends CustomJpaRepository<User, Long>, JpaSpecificationExecutor<User> {


    @Override
    Page<User> findAll(Specification<User> specification, Pageable pageable);
    @Query("select us from User us join fetch us.role where us.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
    Optional<User> findByCpf(String cpf);

    @Query("select case when count(1) > 0 then true else false end from User us " +
            " where us.id = :userId ")
    boolean existsByUser(Long userId);

    @Query("select u, (select r from Role r where u.role.id = r.id) from User u")
    List<User> findAllUserSummary();

}
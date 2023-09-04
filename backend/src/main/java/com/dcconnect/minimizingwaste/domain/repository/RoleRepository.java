package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends CustomJpaRepository<Role, Long> {

    @Query("select r from Role r where r not in (select r from User u join u.role r where  u.id = :userId )")
    List<Role> findAllNotGranted(@Param("userId") Long userId);
    @Query("select r from Role r where r in (select r from User u join u.role r where  u.id = :userId  )")
    List<Role> findAllGranted(@Param("userId") Long userId);


    Optional<Role> findByName(String name);
}
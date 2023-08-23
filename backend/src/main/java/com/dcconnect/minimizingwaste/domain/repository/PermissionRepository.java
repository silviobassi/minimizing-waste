package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Permission;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PermissionRepository extends CustomJpaRepository<Permission, Long> {

    @Query("select p from Permission p where p not in (select p from Role r join r.permissions p where r.id = :roleId )")
    List<Permission> findAllNotGranted(@Param("roleId") Long roleId);

}
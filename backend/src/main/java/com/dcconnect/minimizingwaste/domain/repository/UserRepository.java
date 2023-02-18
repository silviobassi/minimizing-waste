package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends UserRepositoryQueries, CustomJpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    @EntityGraph(attributePaths = {"accessGroups"})
    List<User> findAll(Specification<User> specification);

    Optional<User> findByEmail(String email);

    @Query("select f from UserPhoto f where f.user.id = :userId")
    Optional<UserPhoto> findPhotoById(@Param("userId") Long userId);

}
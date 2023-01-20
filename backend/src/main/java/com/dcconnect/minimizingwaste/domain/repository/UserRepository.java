package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends UserRepositoryQueries, CustomJpaRepository<User, Long>, JpaSpecificationExecutor<User> {


    Optional<User> findByEmail(String email);

    @Query("select f from UserPhoto f where f.user.id = :userId")
    Optional<UserPhoto> findPhotoById(@Param("userId") Long userId);

}
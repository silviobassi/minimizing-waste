package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.UserPhoto;

public interface UserRepositoryQueries {

    UserPhoto save(UserPhoto userPhoto);
    void delete(UserPhoto userPhoto);
}

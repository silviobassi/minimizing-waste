package com.dcconnect.minimizingwaste.infrastructure.repository;

import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import com.dcconnect.minimizingwaste.domain.repository.UserPhotoRepositoryQueries;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class UserPhotoRepositoryQueriesImpl implements UserPhotoRepositoryQueries {

    @PersistenceContext
    private EntityManager manager;

    @Override
    @Transactional
    public UserPhoto save(UserPhoto userPhoto) {
        return manager.merge(userPhoto);
    }


}

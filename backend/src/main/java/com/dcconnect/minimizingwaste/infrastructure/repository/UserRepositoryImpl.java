package com.dcconnect.minimizingwaste.infrastructure.repository;

import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import com.dcconnect.minimizingwaste.domain.repository.UserRepositoryQueries;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserRepositoryImpl implements UserRepositoryQueries {

    @PersistenceContext
    private EntityManager manager;

    @Override
    @Transactional
    public UserPhoto save(UserPhoto userPhoto) {
        return manager.merge(userPhoto);
    }

    @Override
    public void delete(UserPhoto userPhoto) {
        manager.remove(userPhoto);
    }


}

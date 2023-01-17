package com.dcconnect.minimizingwaste.infrastructure.repository;

import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepositoryQueries;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class SupplyRepositoryImpl implements SupplyRepositoryQueries {

    @PersistenceContext
    private EntityManager manager;

    @Override
    @Transactional
    public SupplyMovement create(SupplyMovement supplyMovement) {
        return manager.merge(supplyMovement);
    }

    @Override
    @Transactional
    public void delete(SupplyMovement supplyMovement) {
        manager.remove(supplyMovement);
    }

}

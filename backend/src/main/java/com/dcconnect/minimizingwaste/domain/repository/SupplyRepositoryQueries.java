package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;

import java.util.Optional;

public interface SupplyRepositoryQueries {

    SupplyMovement create(SupplyMovement supplyMovement);

    void delete(SupplyMovement supplyMovement);



}

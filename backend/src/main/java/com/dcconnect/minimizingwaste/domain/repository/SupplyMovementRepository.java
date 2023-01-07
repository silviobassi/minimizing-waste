package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplyMovementRepository extends CustomJpaRepository<SupplyMovement, Long> {

    @EntityGraph(attributePaths = {"workStation.sector", "supply.supplyDescription", "employeeResponsible", "notification"})
    List<SupplyMovement> findAll();

    @EntityGraph(attributePaths = {"workStation", "supply.supplyDescription", "notification"})
    Page<SupplyMovement> findAll(Pageable pageable);

}

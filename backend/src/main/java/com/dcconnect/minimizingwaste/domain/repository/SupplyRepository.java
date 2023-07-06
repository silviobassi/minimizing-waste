package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SupplyRepository extends CustomJpaRepository<Supply, Long>, SupplyRepositoryQueries, JpaSpecificationExecutor<Supply> {

    @EntityGraph(attributePaths = {"supplyDescription"})
    Page<Supply> findAll(Specification<Supply> specification, Pageable pageable);

    @Query(value = "select sm from SupplyMovement sm join fetch sm.workStation w " +
            "join fetch w.sector join fetch sm.supply s join fetch s.supplyDescription join fetch sm.notification",
    countQuery = "select count(sm) from SupplyMovement sm join sm.workStation w " +
            "join w.sector join  sm.supply s join s.supplyDescription  join  sm.notification")
    Page<SupplyMovement> findAllSupplyMovements(Pageable pageable);

    @Query("from SupplyMovement sm join fetch sm.supply s  join fetch sm.workStation w " +
            "join fetch w.sector join fetch sm.notification where sm.notBusy = true")
    List<SupplyMovement> findNotificationBySuppliesAvailable();

    @Query("from SupplyMovement sm where sm.id = :supplyMovementId")
    Optional<SupplyMovement> findBySupplyMovementById(@Param("supplyMovementId") Long supplyMovementId);
}

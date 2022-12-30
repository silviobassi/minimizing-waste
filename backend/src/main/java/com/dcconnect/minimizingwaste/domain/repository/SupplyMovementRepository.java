package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplyMovementRepository extends CustomJpaRepository<SupplyMovement, Long> {

    @Query("select sm from SupplyMovement sm join fetch sm.notification n")
    List<SupplyMovement> findNotificationBySuppliesAvailable();

}

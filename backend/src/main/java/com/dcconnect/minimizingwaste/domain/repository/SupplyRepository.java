package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.repository.filter.SupplyFilter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplyRepository extends CustomJpaRepository<Supply, Long>, JpaSpecificationExecutor<Supply> {

    @Query("from Supply s join fetch s.supplyDescription sd")
    List<Supply> findAll();
}

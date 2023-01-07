package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SupplyRepository extends CustomJpaRepository<Supply, Long>, JpaSpecificationExecutor<Supply> {

    @EntityGraph(attributePaths = {"supplyDescription"})
    Page<Supply> findAll(Specification<Supply> specification, Pageable pageable);
}

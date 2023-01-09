package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.filter.WorkStationFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkStationRepository extends CustomJpaRepository<WorkStation, Long>, JpaSpecificationExecutor<WorkStation> {

    @EntityGraph(attributePaths = {"sector"})
    List<WorkStation> findAll(Specification<WorkStation> specification);
}

package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkStationRepository extends CustomJpaRepository<WorkStation, Long> {

    List<WorkStation> findAll();
}

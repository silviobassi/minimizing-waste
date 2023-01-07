package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Sector;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface SectorRepository extends CustomJpaRepository<Sector, Long>, JpaSpecificationExecutor<Sector> {

    Optional<Sector> findByName(String name);
}

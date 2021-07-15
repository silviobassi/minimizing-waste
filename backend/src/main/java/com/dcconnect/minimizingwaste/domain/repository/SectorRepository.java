package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Sector;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;
import java.util.Optional;

public interface SectorRepository extends CustomJpaRepository<Sector, Long> {

    @Override
    List<Sector> findAll();

    Optional<Sector> findByName(String name);
}

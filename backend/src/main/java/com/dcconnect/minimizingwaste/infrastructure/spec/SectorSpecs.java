package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.repository.filter.SectorFilter;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;

public class SectorSpecs {

    public static Specification<Sector> usingFilter(SectorFilter sectorFilter){
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if(sectorFilter.getSectorName() != null) {
                predicates.add(criteriaBuilder.like(root.get("name"), sectorFilter.getSectorName()+"%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}

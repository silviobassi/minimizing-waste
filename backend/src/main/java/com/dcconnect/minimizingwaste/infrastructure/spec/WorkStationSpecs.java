package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.filter.WorkStationFilter;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;

public class WorkStationSpecs {

    public static Specification<WorkStation> usingFilter(WorkStationFilter workStationFilter){
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if(workStationFilter.getWorkStationName() != null) {
                predicates.add(criteriaBuilder.like(root.get("name"), workStationFilter.getWorkStationName()+"%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}

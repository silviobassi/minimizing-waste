package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.repository.filter.SupplyFilter;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;

public class SupplySpecs {

    public static Specification<Supply> usingFilter(SupplyFilter supplyFilter){
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if(supplyFilter.getName() != null) {
                predicates.add(criteriaBuilder.like(root.get("name"), supplyFilter.getName()+"%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}

package com.dcconnect.minimizingwaste.infrastructure.spec;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.Assignment_;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.User_;
import com.dcconnect.minimizingwaste.domain.repository.filter.ResponsibleFilter;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class ResponsibleSpecs {

    public static Specification<Assignment> usingFilter(ResponsibleFilter responsibleFilter){
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            Join<Assignment, User> employeeResponsible = root.join(Assignment_.EMPLOYEES_RESPONSIBLE, JoinType.INNER);

            if(responsibleFilter.getResponsibleName() != null) {
                predicates.add(criteriaBuilder.like(employeeResponsible.get(User_.name),
                        responsibleFilter.getResponsibleName()+"%"));
            }

            if(responsibleFilter.getResponsibleCpf() != null) {
                predicates.add(criteriaBuilder.like(employeeResponsible.get(User_.cpf),
                        responsibleFilter.getResponsibleCpf()+"%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}

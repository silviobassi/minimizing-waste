package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter

@DiscriminatorColumn(name = "supply_type", discriminatorType = DiscriminatorType.STRING)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
@Table(name = "supplies")
public class Supply extends BaseEntity{

    private String name;

    @OneToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "supply_description_id")
    private SupplyDescription supplyDescription;

}

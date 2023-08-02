package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.*;

import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Getter
@Setter

@Entity
@Table(name = "supplies")
public class Supply extends BaseEntity{

    private String name;

    @OneToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "supply_description_id")
    private SupplyDescription supplyDescription;

    @Enumerated(EnumType.STRING)
    private SupplyType supplyType;

    @Enumerated(EnumType.STRING)
    private Manipulation manipulation;

    @Enumerated(EnumType.STRING)
    private Bulk bulk;

    public boolean isManipulation(){
        return getManipulation() == Manipulation.IMUTÁVEL || getManipulation() == Manipulation.TRANSMUTÁVEL;
    }

    public boolean isBulk(){
        return getBulk() == Bulk.PEQUENO || getBulk() == Bulk.MÉDIO || getBulk() == Bulk.GRANDE;
    }

    public boolean isEquipment(){
        return getSupplyType() == SupplyType.EQUIPAMENTO;
    }

    public boolean isMaterial(){
        return getSupplyType() == SupplyType.MATERIAL;
    }

}

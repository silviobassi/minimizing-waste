package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter

@Entity
@Table(name = "descriptions_supplies")
public class SupplyDescription extends BaseEntity{

    private String packing;
    private Long quantity;
    private BigDecimal total;
    private BigDecimal measure;

    @Enumerated(EnumType.STRING)
    private MeasureUnitType measureUnitType;

    @PrePersist
    @PreUpdate
    public void quantityCalculate(){
        if(measure == null){
            measure = new BigDecimal(1.0);
        }
        total = measure.multiply(new BigDecimal(quantity));
    }
}

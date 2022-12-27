package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.MeasureUnitType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SupplyDescriptionDetailedModel {
    private String packing;
    private Long quantity;
    private BigDecimal measure;
    private BigDecimal total;

    private MeasureUnitType measureUnitType;
}

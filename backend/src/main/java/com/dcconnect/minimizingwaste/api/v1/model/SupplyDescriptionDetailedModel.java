package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.MeasureUnitType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SupplyDescriptionDetailedModel {
    @Schema(example = "Saco plástico")
    private String packing;
    @Schema(example = "3")
    private Long quantity;
    @Schema(example = "40")
    private BigDecimal measure;
    @Schema(example = "120")
    private BigDecimal total;
    @Schema(example = "KG")
    private MeasureUnitType measureUnitType;
}

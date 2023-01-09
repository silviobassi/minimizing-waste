package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.MeasureUnitType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SupplyDescriptionSummaryModel {

    @Schema(example = "2")
    private Long quantity;
    @Schema(example = "50")
    private BigDecimal measure;
    @Schema(example = "100")
    private BigDecimal total;
    @Schema(example = "KG")
    private MeasureUnitType measureUnitType;
}

package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.domain.model.MeasureUnitType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
public class SupplyDescriptionInput {

    @NotBlank
    private String packing;

    @NotNull
    @Min(value = 1L)
    private SupplyMovementInput quantity;

    @NotNull
    @Min(value = 1L)
    private BigDecimal measure;

    @Valid
    @NotNull
    private MeasureUnitType measureUnitType;

}

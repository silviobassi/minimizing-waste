package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.domain.model.MeasureUnitType;
import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(example = "Caixa de Papel")
    @NotBlank
    private String packing;

    @Schema(example = "1")
    @NotNull
    @Min(value = 1L)
    private Long quantity;

    @Schema(example = "50.00")
    private BigDecimal measure;

    @Schema(example = "KG")
    @Valid
    @NotNull
    private MeasureUnitType measureUnitType;

}

package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class DevolvedSupplyMovementInput {

    @Schema(example = "2")
    @NotNull
    @Min(value = 1L)
    private Long reservedQuantity;

}

package com.dcconnect.minimizingwaste.api.v1.model.input;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ReturnedSupplyMovementInput {

    @NotNull
    @Min(value = 1L)
    private Long reservedQuantity;

}

package com.dcconnect.minimizingwaste.api.v1.model.input;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SupplyMovementInput {

    @NotNull
    private Boolean movable;

    @Min(value = 1L)
    private Long reservedQuantity;

    @Valid
    @NotNull
    private NotificationInput notification;

    @Valid
    @NotNull
    private WorkStationIdInput workStation;

    @Valid
    @NotNull
    private SupplyIdInput supply;

}

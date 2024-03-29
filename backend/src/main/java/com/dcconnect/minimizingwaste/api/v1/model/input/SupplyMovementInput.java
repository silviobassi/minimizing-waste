package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class SupplyMovementInput {

    @Schema(example = "true")
    @NotNull
    private Boolean movable;
    @Schema(example = "3")
    @NotNull
    @Min(1L)
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

    @Valid
    @NotNull
    private UserIdInput employeeResponsible;

}

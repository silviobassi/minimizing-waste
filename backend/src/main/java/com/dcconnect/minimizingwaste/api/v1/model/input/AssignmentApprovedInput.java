package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

@Setter
@Getter
public class AssignmentApprovedInput {

    @Schema(example = "true")
    @NotNull
    private Boolean approved;

    @Schema(example = "2023-01-20T13:00:33Z")
    private OffsetDateTime endDate;

}

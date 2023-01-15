package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class AssignmentInput {

    @Schema(example = "Revestimento dos Banheiros")
    @NotBlank
    private String title;
    @Schema(example = "2022-12-28T13:00:33Z")
    @NotNull
    private OffsetDateTime startDate;
    @Schema(example = "2023-01-20T13:00:33Z")
    @NotNull
    private OffsetDateTime deadline;
    @Schema(example = "OBRAS")
    @NotBlank
    private String nature;

    @Valid
    @NotNull
    private WorkStationIdInput workStation;

}

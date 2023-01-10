package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.domain.model.Nature;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

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

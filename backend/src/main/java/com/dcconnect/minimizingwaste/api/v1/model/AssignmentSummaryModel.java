package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class AssignmentSummaryModel {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Rejuntamento de Revestimento")
    private String title;
    @Schema(example = "20230209T14:30:01Z")
    private OffsetDateTime startDate;
    @Schema(example = "20230209T14:30:01Z")
    private OffsetDateTime endDate;
    @Schema(example = "20230209T14:30:01Z")
    private OffsetDateTime deadline;
    @Schema(example = "true")
    private boolean completed;
    @Schema(example = "true")
    private boolean approved;

}

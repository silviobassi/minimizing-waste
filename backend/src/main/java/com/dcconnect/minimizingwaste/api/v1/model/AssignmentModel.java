package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationIdInput;
import com.dcconnect.minimizingwaste.domain.model.Nature;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

@Relation(collectionRelation = "assignments")
@Getter
@Setter
public class AssignmentModel extends RepresentationModel<AssignmentModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Revestimento dos Banheiros")
    private String title;
    @Schema(example = "2022-12-28T13:00:33Z")
    private OffsetDateTime startDate;
    @Schema(example = "2023-01-20T13:00:33Z")
    private OffsetDateTime deadline;
    @Schema(example = "true")
    private boolean completed;
    @Schema(example = "false")
    private boolean approved;
    @Schema(example = "OBRAS")
    private Nature nature;

    private WorkStationModel workStation;
}

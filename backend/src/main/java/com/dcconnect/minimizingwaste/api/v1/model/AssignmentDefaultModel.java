package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Nature;
import com.dcconnect.minimizingwaste.domain.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import java.time.OffsetDateTime;
import java.util.List;

@Relation(collectionRelation = "assignments")
@Getter
@Setter
public class AssignmentDefaultModel extends RepresentationModel<AssignmentDefaultModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Revestimento dos Banheiros")
    private String title;
    @Schema(example = "Banheiro 01")
    private String specificPoint;
    @Schema(example = "2022-12-28T13:00:33Z")
    private OffsetDateTime startDate;
    @Schema(example = "2023-01-20T13:00:33Z")
    private OffsetDateTime deadline;
    @Schema(example = "2023-01-20T13:00:33Z")
    private OffsetDateTime endDate;
    @Schema(example = "2023-01-20T13:00:33Z")
    private OffsetDateTime approveDate;
    @Schema(example = "true")
    private boolean completed;
    @Schema(example = "false")
    private boolean approved;
    @Schema(example = "OBRAS")
    private Nature nature;

    private WorkStationModel workStation;

    private NotificationModel notification;

    private List<UserWhatsAppModel> employeesResponsible;

}

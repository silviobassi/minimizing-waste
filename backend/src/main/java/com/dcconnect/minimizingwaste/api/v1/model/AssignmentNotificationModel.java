package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Nature;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AssignmentNotificationModel {

    @Schema(example = "Início de Tarefa")
    private String title;
    @Schema(example = "20230121T12:00:00Z")
    private OffsetDateTime deadline;

    private WorkStationDetailedModel workStation;
    private NotificationModel notification;


}

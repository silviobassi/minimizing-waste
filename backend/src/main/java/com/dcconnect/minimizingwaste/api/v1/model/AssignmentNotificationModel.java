package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Nature;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AssignmentNotificationModel {

    private String title;
    private OffsetDateTime startDate;
    private OffsetDateTime endDate;
    private OffsetDateTime deadline;
    private Boolean completed;
    private Boolean approved;
    private String approvalDescription;
    private Nature nature;
    private WorkStationDetailedModel workStation;
    private NotificationModel notification;

}

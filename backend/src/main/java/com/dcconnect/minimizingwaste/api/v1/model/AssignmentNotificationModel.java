package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Nature;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
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

    @Getter
    @Setter
    public static class SupplySummaryModel {

        private Long id;

        private String name;

    }
}

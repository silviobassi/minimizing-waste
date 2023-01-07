package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplyMovementNotificationModel {

    private Long id;
    private SupplySummaryModel supply;
    private SupplyDescriptionSummaryModel supplyDescription;
    private WorkStationDetailedModel workStation;
    private NotificationModel notification;
}

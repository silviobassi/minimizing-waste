package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplyMovementNotificationModel {

    @Schema(example = "1")
    private Long id;

    private SupplySummaryModel supply;
    private SupplyDescriptionSummaryModel supplyDescription;
    private WorkStationDetailedModel workStation;
    private NotificationModel notification;
}

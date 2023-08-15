package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "supplyMovementNotifications")
@Getter
@Setter
public class SupplyMovementNotificationModel extends RepresentationModel<SupplyMovementNotificationModel> {

    @Schema(example = "1")
    private Long id;
    private SupplySummaryModel supply;
    private WorkStationDetailedModel workStation;
    private NotificationModel notification;
}

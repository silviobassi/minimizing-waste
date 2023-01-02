package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "supplies-movements")
@Getter
@Setter
public class SupplyMovementModel extends RepresentationModel<SupplyMovementModel> {

    private Long id;
    private boolean notBusy;
    private boolean movable;
    private Long allocatedQuantity;

    private NotificationModel notification;
    private WorkStationModel workStation;
    private SupplySummaryModel supply;
}

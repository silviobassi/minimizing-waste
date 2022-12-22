package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplyMovementModel {

    private Long id;
    private boolean notBusy;
    private boolean movable;
    private Long allocatedQuantity;

    private NotificationModel notification;
    private WorkStationModel workStation;
    private SupplySummary supply;
}

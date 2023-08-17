package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "suppliesMovements")
@Getter
@Setter
public class SupplyMovementModel extends RepresentationModel<SupplyMovementModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "true")
    private boolean notBusy;
    @Schema(example = "false")
    private boolean movable;
    @Schema(example = "20")
    private Long allocatedQuantity;
    private NotificationModel notification;
    @Schema(example = "1")
    private WorkStationModel workStation;
    @Schema(example = "1")
    private SupplySummaryModel supply;

    private UserEmployeeModel employeeResponsible;
}

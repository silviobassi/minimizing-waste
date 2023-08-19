package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "suppliesMovements")
@Getter
@Setter
public class SupplyMovementDevolvedModel extends RepresentationModel<SupplyMovementDevolvedModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "20")
    private Long allocatedQuantity;
    @Schema(example = "1")
    private SupplySummaryModel supply;

}

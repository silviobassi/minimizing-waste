package com.dcconnect.minimizingwaste.api.v1.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "supplies")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SupplySummaryModel extends RepresentationModel<SupplySummaryModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Recurso")
    private String name;

    private SupplyDescriptionDetailedModel supplyDescription;

}

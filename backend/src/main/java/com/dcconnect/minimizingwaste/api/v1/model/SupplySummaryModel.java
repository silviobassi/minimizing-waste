package com.dcconnect.minimizingwaste.api.v1.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "supplies")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SupplySummaryModel extends RepresentationModel<SupplySummaryModel> {

    private Long id;
    private String name;

    private SupplyDescriptionSummaryModel supplyDescription;

}

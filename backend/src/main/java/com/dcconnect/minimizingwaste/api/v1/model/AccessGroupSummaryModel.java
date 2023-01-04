package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "access-groups")
@Getter
@Setter
public class AccessGroupSummaryModel extends RepresentationModel<AccessGroupSummaryModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Engenheiro")
    private String name;
}

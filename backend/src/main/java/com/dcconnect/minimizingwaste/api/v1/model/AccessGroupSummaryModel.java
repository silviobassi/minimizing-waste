package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "access-groups")
@Getter
@Setter
public class AccessGroupSummaryModel extends RepresentationModel<AccessGroupSummaryModel> {

    private Long id;

    private String name;
}

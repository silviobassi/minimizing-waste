package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "permissions")
@Setter
@Getter
public class PermissionDetailedModel extends RepresentationModel<PermissionDetailedModel> {

    private Long id;
    private String name;

    private String description;

}

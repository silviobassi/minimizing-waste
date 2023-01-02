package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "sectors")
@Getter
@Setter
public class SectorModel extends RepresentationModel<SectorModel> {

    private Long id;
    private String name;

}

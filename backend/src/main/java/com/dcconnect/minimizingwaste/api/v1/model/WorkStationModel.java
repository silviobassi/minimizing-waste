package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "workStations")
@Getter
@Setter
public class WorkStationModel extends RepresentationModel<WorkStationModel> {

    private Long id;
    private String name;
    private String localization;

}

package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "workStations")
@Getter
@Setter
public class WorkStationModel extends RepresentationModel<WorkStationModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Bloco B Apto 27")
    private String name;
    @Schema(example = "Próximo ao Jardim da Fachada")
    private String localization;

    private SectorModel sector;

}

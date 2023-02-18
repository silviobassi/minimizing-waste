package com.dcconnect.minimizingwaste.api.v1.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "sectors")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
@Setter
public class SectorModel extends RepresentationModel<SectorModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Acabamento")
    private String name;

}

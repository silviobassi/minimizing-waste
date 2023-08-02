package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Bulk;
import com.dcconnect.minimizingwaste.domain.model.Manipulation;
import com.dcconnect.minimizingwaste.domain.model.SupplyType;
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
public class SupplyDetailedModel extends RepresentationModel<SupplyDetailedModel> {
    @Schema(example = "1")
    private Long id;
    @Schema(example = "Cimento")
    private String name;
    @Schema(example = "EQUIPAMENTO")
    private SupplyType supplyType;
    @Schema(example = "PEQUENO")
    private Bulk bulk;

    @Schema(example = "TRANSMUTÁVEL")
    private Manipulation manipulation;
    private SupplyDescriptionDetailedModel supplyDescription;

}

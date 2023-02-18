package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Bulk;
import com.dcconnect.minimizingwaste.domain.model.Manipulation;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SupplyDetailedModel {
    @Schema(example = "1")
    private Long id;
    @Schema(example = "Cimento")
    private String name;
    @Schema(example = "TRANSMUTÁVEL")
    private Manipulation manipulation;
    @Schema(example = "PEQUENO")
    private Bulk bulk;

    private SupplyDescriptionDetailedModel supplyDescription;

}

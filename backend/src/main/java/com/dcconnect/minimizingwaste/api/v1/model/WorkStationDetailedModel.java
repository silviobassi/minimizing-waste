package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkStationDetailedModel {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Bloco G Apto 21")
    private String name;
    @Schema(example = "Bloco G Apto 21")
    private String localization;

    private SectorModel sector;

}

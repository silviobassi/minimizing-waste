package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class WorkStationInput {

    @Schema(example = "Bloco B Apto 27")
    @NotBlank
    private String name;

    @Schema(example = "Próximo ao Jardim da Fachada")
    @NotBlank
    private String localization;

    @Valid
    @NotNull
    private SectorIdInput sector;
}

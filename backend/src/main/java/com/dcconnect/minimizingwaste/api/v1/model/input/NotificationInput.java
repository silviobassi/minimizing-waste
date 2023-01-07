package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class NotificationInput {

    @Schema(example = "Início de Instalação de Revestimentos")
    @NotBlank
    private String title;
    @Schema(example = "Liberação de Banheiros")
    @NotBlank
    private String reason;
    @Schema(example = "Instalação de gessos nos tetos")
    @NotBlank
    private String goal;

}

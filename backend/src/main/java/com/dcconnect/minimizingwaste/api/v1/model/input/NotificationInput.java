package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class NotificationInput {

    @Schema(example = "Início de Instalação de Revestimentos")
    @NotBlank
    private String title;
    @Schema(example = "Liberação de Banheiros")

    @Size(max = 300)
    @NotBlank
    private String reason;
    @Schema(example = "Instalação de gessos nos tetos")
    @NotBlank
    private String goal;

}

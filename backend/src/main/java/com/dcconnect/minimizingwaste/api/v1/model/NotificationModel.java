package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class NotificationModel {

    @Schema(example = "2023-01-07T22:50:00Z")
    private OffsetDateTime createdAt;
    @Schema(example = "Início de Instalação de Revestimentos")
    private String title;
    @Schema(example = "Liberação de Banheiros")
    private String reason;
    @Schema(example = "Instalação de gessos nos tetos")
    private String goal;

}

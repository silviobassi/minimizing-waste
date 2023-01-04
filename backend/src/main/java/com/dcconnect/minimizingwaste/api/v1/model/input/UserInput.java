package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserInput {

    @Schema(example = "Pedro Oliveira Bassi")
    @NotBlank
    private String name;
    @Schema(example = "99999999999")
    @NotBlank
    private String cpf;
    @Schema(example = "pedro@gmail.com")
    @NotBlank
    @Email
    private String email;
    @Schema(example = "17996079654")
    @NotBlank
    private String whatsApp;
    @Schema(example = "Azulejista")
    @NotBlank
    private String office;
    @Schema(example = "Instalador de Revestimento")
    @NotBlank
    private String occupation;
    @Schema(example = "Curso Superior Incompleto")
    @NotBlank
    private String literate;
}

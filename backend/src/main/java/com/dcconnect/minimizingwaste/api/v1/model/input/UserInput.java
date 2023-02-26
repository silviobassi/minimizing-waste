package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInput {

    @Schema(example = "Pedro Oliveira Bassi")
    @NotBlank
    private String name;
    @Schema(example = "9585hf7#_")
    @NotBlank
    private String password;
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

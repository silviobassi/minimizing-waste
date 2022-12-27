package com.dcconnect.minimizingwaste.api.v1.model.input;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserInput {
    @NotBlank
    private String name;
    @NotBlank
    private String cpf;
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String whatsApp;
    @NotBlank
    private String office;
    @NotBlank
    private String occupation;

    @NotBlank
    private String literate;
}

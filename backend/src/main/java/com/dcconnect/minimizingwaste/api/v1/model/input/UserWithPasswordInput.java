package com.dcconnect.minimizingwaste.api.v1.model.input;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class UserWithPasswordInput {

    @NotBlank
    private String password;

}

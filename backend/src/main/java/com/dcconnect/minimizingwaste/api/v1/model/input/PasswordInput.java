package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class PasswordInput {

    @Schema(example = "12k43jd8#*")
    @NotBlank
    private String currentPassword;

    @Schema(example = "1938kdk#")
    @NotBlank
    private String newPassword;
}

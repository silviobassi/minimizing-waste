package com.dcconnect.minimizingwaste.api.v1.model.input;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserIdInput {

    @Schema(example = "2")
    @NotNull
    private Long id;
}

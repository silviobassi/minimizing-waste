package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.domain.model.Manipulation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class SupplyMaterialInput extends SupplyInput {

    @Schema(example = "TRANSMUTÁVEL")
    @Valid
    @NotNull
    private Manipulation manipulation;

}

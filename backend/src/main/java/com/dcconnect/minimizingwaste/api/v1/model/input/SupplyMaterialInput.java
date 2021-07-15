package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.domain.model.Manipulation;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SupplyMaterialInput extends SupplyInput {

    @Valid
    @NotNull
    private Manipulation manipulation;

}

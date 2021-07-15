package com.dcconnect.minimizingwaste.api.v1.model.input;

import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SupplyInput {

    @NotBlank
    private String name;

    @Valid
    @NotNull
    private SupplyDescriptionInput supplyDescription;

}

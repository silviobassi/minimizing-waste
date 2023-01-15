package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.domain.model.Bulk;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class SupplyEquipmentInput extends SupplyInput {

    @Valid
    @NotNull
    private Bulk bulk;

}

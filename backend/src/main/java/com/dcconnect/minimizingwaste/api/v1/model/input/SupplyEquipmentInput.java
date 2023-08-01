package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.domain.model.Bulk;
import com.dcconnect.minimizingwaste.domain.model.SupplyType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplyEquipmentInput {

    @Schema(example = "Recurso")
    @NotBlank
    private String name;

    @Valid
    @NotNull
    private SupplyDescriptionInput supplyDescription;

    @NotBlank
    private String supplyType;

    @NotBlank
    private String bulk;

}

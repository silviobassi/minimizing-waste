package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Manipulation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialSupplyModel extends SupplySummaryModel {

    @Schema(example = "TRANSMUTÁVEL")
    private Manipulation manipulation;

}

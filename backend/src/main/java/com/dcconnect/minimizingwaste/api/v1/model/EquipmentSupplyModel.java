package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Bulk;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipmentSupplyModel extends SupplySummaryModel {

    @Schema(example = "MÉDIO")
    private Bulk bulk;

}

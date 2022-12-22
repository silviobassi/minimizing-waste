package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Bulk;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipmentSupplyModel extends SupplySummary {

    private Bulk bulk;

}

package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Manipulation;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialSupplySupplyModel extends SupplySummary {

    private Manipulation manipulation;

}

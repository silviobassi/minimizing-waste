package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.Bulk;
import com.dcconnect.minimizingwaste.domain.model.Manipulation;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SupplyDetailedModel {

    private Long id;
    private String name;

    private Manipulation manipulation;

    private Bulk bulk;

    private SupplyDescriptionDetailedModel supplyDescription;

}

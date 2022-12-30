package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkStationDetailedModel {

    private Long id;
    private String name;
    private String localization;

    private SectorModel sector;

}

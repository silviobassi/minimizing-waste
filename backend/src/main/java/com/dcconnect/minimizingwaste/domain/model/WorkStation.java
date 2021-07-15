package com.dcconnect.minimizingwaste.domain.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter

@Entity
@Table(name = "work_stations")
public class WorkStation extends BaseEntity{

    private String name;
    private String localization;

    @JsonBackReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "sector_id")
    private Sector sector;

}
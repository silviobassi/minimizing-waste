package com.dcconnect.minimizingwaste.domain.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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
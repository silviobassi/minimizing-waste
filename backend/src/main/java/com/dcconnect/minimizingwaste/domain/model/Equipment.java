package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Getter
@Setter

@DiscriminatorValue("equipment")

@Entity
public class Equipment extends Supply {

    @Enumerated(EnumType.STRING)
    private Bulk bulk;

}

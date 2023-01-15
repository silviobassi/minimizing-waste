package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Getter
@Setter

@DiscriminatorValue("material")

@Entity
public class Material extends Supply {

    @Enumerated(EnumType.STRING)
    private Manipulation manipulation;

}

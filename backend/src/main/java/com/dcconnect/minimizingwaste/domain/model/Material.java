package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter

@DiscriminatorValue("material")

@Entity
public class Material extends Supply {

    @Enumerated(EnumType.STRING)
    private Manipulation manipulation;

}

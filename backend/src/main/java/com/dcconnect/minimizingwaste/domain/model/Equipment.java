package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter

@DiscriminatorValue("equipment")

@Entity
public class Equipment extends Supply {

    @Enumerated(EnumType.STRING)
    private Bulk bulk;

}

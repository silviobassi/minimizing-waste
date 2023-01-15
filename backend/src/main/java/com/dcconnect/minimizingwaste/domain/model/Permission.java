package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Getter
@Setter

@Entity
@Table(name = "permissions")
public class Permission extends BaseEntity{

    private String name;
    private String description;

}

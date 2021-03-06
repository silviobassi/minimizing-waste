package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter

@Entity
@Table(name = "permissions")
public class Permission extends BaseEntity{

    private String name;
    private String description;

}

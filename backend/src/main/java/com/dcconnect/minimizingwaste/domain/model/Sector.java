package com.dcconnect.minimizingwaste.domain.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "sectors")
public class Sector extends BaseEntity{


    private String name;

}

package com.dcconnect.minimizingwaste.domain.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "sectors")
public class Sector extends BaseEntity{

    private String name;
}

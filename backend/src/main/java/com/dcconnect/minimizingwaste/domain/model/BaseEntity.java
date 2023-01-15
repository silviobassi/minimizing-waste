package com.dcconnect.minimizingwaste.domain.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

@MappedSuperclass
public class BaseEntity {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}

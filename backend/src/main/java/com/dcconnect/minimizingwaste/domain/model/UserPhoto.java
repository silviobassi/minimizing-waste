package com.dcconnect.minimizingwaste.domain.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.*;

import java.nio.file.Path;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "users_photos")
public class UserPhoto {

    @EqualsAndHashCode.Include
    @Id
    @Column(name = "user_id")
    private Long id;
    private String fileName;
    private String description;
    private String contentType;
    private Long size;


}

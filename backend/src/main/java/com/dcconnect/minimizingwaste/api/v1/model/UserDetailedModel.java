package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter

public class UserDetailedModel {

    private Long id;
    private String name;
    private String cpf;
    private String email;
    private String whatsApp;
    private String office;
    private String occupation;

    private String literate;

    private OffsetDateTime createdAt;

}

package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import java.time.OffsetDateTime;

@Relation(collectionRelation = "users")
@Getter
@Setter

public class UserDetailedModel extends RepresentationModel<UserDetailedModel> {

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

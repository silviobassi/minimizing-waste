package com.dcconnect.minimizingwaste.api.v1.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import java.time.OffsetDateTime;

@Relation(collectionRelation = "users")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDetailedModel extends RepresentationModel<UserDetailedModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Pedro Oliveira Bassi")
    private String name;
    @Schema(example = "99999999999")
    private String cpf;
    @Schema(example = "pedro@gmail.com")
    private String email;
    @Schema(example = "17996079654")
    private String whatsApp;
    @Schema(example = "Azulejista")
    private String office;
    @Schema(example = "Instalador de Revestimento")
    private String occupation;
    @Schema(example = "Curso Superior Incompleto")
    private String literate;

    @Schema(example = "https://localhost:8080/directory/dgfodsg809427yt3ijbvfdlkh0i650k50_file")
    private String avatarUrl;

    @Schema(example = "2023-01-03T22:08Z")
    private OffsetDateTime createdAt;
    private RoleDetailedModel role;

}

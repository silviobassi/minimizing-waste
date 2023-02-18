package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import java.time.OffsetDateTime;
import java.util.List;

@Relation(collectionRelation = "users")
@Getter
@Setter

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
    @Schema(example = "2023-01-03T22:08Z")
    private OffsetDateTime createdAt;

    private List<AccessGroupSummaryModel> accessGroups;

}

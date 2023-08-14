package com.dcconnect.minimizingwaste.api.v1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "users")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)

public class UserAssignedModel extends RepresentationModel<UserAssignedModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Pedro Oliveira Bassi")
    private String name;
    @Schema(example = "17996079654")
    private String whatsApp;
    @Schema(example = "Azulejista")
    private String office;
    @Schema(example = "Instalador de Revestimento")
    private String occupation;

    @Schema(example = "https://localhost:8080/directory/lkdsfsdjlg439t74309jg3gikogiewrig_file")
    private String avatarUrl;

}

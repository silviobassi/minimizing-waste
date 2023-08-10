package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import org.springframework.hateoas.server.core.Relation;

@Relation(collectionRelation = "files-avatar")
@Getter
@Builder
public class AvatarUrlModel {

    @Schema(example = "https://localhost:8080/directory/901582309572090idjksflkdlsrow4t_file")
    private String avatarUrl;
}

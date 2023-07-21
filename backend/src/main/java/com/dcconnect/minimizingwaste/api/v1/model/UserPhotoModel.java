package com.dcconnect.minimizingwaste.api.v1.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserPhotoModel extends RepresentationModel<UserPhotoModel> {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "055a87c9-46fc-47c4-b093-dfe5d31f7a6e_avatar_test.jpg")
    private String fileName;
    @Schema(example = "Silvio Bassi")
    private String description;
    @Schema(example = "image/jpeg")
    private String contentType;
    @Schema(example = "74697")
    private Long size;

    @Schema(example = "https://server.com/lkfnlkflkfjlakfalkfjalkfjalkfjaslkfjaslf.jpeg")
    private String url;
}

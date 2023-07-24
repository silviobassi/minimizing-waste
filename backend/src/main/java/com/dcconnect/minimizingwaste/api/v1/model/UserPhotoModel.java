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
    @Schema(example = "https://server.com/lkfnlkflkfjlakfalkfjalkfjalkfjaslkfjaslf.jpeg")
    private String url;
}

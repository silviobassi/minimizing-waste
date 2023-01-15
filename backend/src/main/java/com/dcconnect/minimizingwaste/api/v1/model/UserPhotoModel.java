package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.domain.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Setter
@Getter
public class UserPhotoModel extends RepresentationModel<UserPhotoModel> {

    private Long id;
    private String fileName;
    private String description;
    private String contentType;
    private Long size;

}

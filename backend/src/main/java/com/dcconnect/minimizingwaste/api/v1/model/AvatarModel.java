package com.dcconnect.minimizingwaste.api.v1.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AvatarModel {

    @Schema(example = "http://server.com/3952jf043gj45uy09t8y=34yt390tu.jpeg")
    private String avatarUrl;
}

package com.dcconnect.minimizingwaste.api.v1.model.input;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class NotificationInput {

    @NotBlank
    private String title;

    @NotBlank
    private String reason;

    @NotBlank
    private String goal;


}

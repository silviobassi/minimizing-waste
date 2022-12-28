package com.dcconnect.minimizingwaste.api.v1.model.input;

import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AssignmentNotificationInput {

    @Valid
    @NotNull
    private NotificationInput notification;

}

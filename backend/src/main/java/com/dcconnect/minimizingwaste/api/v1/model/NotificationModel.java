package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class NotificationModel {

    private OffsetDateTime createdAt;
    private String title;
    private String reason;
    private String goal;

}

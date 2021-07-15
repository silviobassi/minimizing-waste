package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationModel {

    private String title;
    private String reason;
    private String goal;

    //private List<Usuario> usuarios;

}

package com.dcconnect.minimizingwaste.api.v1.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserDetailed {

    private Long id;
    private String name;
    private String cpf;
    private String email;
    private String whatsApp;
    private String office;
    private String occupation;

    private String literate;

}

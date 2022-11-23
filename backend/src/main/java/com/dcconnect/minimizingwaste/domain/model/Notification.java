package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity{

    private String title;
    private String reason;
    private String goal;

}

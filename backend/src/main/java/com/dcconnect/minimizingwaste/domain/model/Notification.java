package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity{

    @CreationTimestamp
    private OffsetDateTime createdAt;
    private String title;
    private String reason;
    private String goal;

}

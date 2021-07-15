package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Getter
@Setter

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity{

    private String title;
    private OffsetDateTime startDate;
    private OffsetDateTime endDate;
    private int deadline;
    private boolean completed;
    private boolean validated;

    @Enumerated(EnumType.STRING)
    private Nature nature;

    @OneToOne(optional = false)
    @JoinColumn(name = "notification_id")
    private Notification notification;
}

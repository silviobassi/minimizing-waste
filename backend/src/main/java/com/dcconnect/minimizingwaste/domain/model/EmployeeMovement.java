package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Getter
@Setter

@Entity
@Table(name = "employees_movement")
public class EmployeeMovement extends BaseEntity{

    @CreationTimestamp
    private OffsetDateTime createAt;

    @UpdateTimestamp
    private OffsetDateTime updateAt;

    private boolean allocated;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @ManyToOne(optional = false)
    @JoinColumn(name = "work_station_id")
    private WorkStation workStation;
}

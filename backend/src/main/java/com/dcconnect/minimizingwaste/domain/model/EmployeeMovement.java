package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "employees_movements")
public class EmployeeMovement extends BaseEntity{

    @CreationTimestamp
    private OffsetDateTime createAt;

    @UpdateTimestamp
    private OffsetDateTime updateAt;

    private boolean allocated;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(name = "employees_movements_tasks", joinColumns = @JoinColumn(name = "employee_movement_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id"))
    private List<Task> tasks;

    @OneToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sector_id")
    private Sector sector;
}

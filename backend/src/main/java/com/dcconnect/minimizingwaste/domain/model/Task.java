package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.Set;

@Getter
@Setter

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

    private String title;
    private OffsetDateTime startDate;
    private OffsetDateTime endDate;
    private OffsetDateTime deadline;
    private boolean completed;
    private boolean validated;

    @Enumerated(EnumType.STRING)
    private Nature nature;

    @ManyToMany
    @JoinTable(name = "tasks_employees_movement", joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_movement_id"))
    private Set<Task> employeesMovement;
}

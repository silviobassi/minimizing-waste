package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter

@Entity
@Table(name = "assignments")
public class Assignment extends BaseEntity {

    private String title;
    private OffsetDateTime startDate;
    private OffsetDateTime endDate;
    private OffsetDateTime deadline;
    private Boolean completed;
    private Boolean approved;
    private String approvalDescription;

    @Enumerated(EnumType.STRING)
    private Nature nature;


    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "work_station_id")
    private WorkStation workStation;

    @ManyToMany
    @JoinTable(name = "assignments_employees",
    joinColumns = @JoinColumn(name = "assignment_id"),
    inverseJoinColumns = @JoinColumn(name = "responsible_employee_id"))
    private Set<User> employeeResponsible = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_id")
    private Notification notification;

    public void addEmployeeResponsible(User employeeResponsible){
        getEmployeeResponsible().add(employeeResponsible);
    }

    public void removeEmployeeResponsible(User employeeResponsible){
        getEmployeeResponsible().remove(employeeResponsible);
    }
    @PrePersist
    public void persist(){
        if(completed == null)
            setCompleted(false);

        if(approved == null)
            setApproved(false);
    }
}

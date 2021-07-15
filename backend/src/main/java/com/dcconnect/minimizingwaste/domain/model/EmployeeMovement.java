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

    @ManyToOne(optional = false)
    @JoinColumn(name = "sector_id")
    private Sector sector;
}

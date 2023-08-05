package com.dcconnect.minimizingwaste.domain.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter

@Entity
@Table(name = "users")
public class User extends BaseEntity {

    private String name;
    private String cpf;
    private String email;
    private String whatsApp;
    private String password;
    private String office;
    private String occupation;

    private String literate;

    @JsonBackReference
    @ManyToMany(mappedBy = "employeesResponsible")
    private Set<Assignment> assignments = new HashSet<>();

    @CreationTimestamp
    private OffsetDateTime createdAt;
    @ManyToMany
    @JoinTable(name = "users_access_groups", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "access_group_id"))
    private List<AccessGroup> accessGroups = new ArrayList<>();

    public boolean removeAccessGroup(AccessGroup accessGroup) {
        return getAccessGroups().remove(accessGroup);
    }

    public boolean addAccessGroups(AccessGroup accessGroup) {
        return getAccessGroups().add(accessGroup);
    }

    public boolean isNew() {
        return getId() == null;
    }

    public boolean isCurrent() {
        return getId() != null;
    }
}

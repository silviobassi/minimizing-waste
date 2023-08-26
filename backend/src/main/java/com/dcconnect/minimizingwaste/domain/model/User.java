package com.dcconnect.minimizingwaste.domain.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.HashSet;
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

    private String avatarUrl;


    @JsonBackReference
    @ManyToMany(mappedBy = "employeesResponsible")
    private Set<Assignment> assignments = new HashSet<>();

    @CreationTimestamp
    private OffsetDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    @Transient
    private String currentAvatarUrl;



    public boolean removeRole() {
        setRole(null);
        return getRole() == null;
    }

    public boolean addRole() {
        setRole(getRole());
        return getRole() != null;
    }

    public boolean isNew() {
        return getId() == null;
    }

    public boolean isNotNew(){
        return !isNew();
    }

    public boolean isCurrentAvatarUrl(){
        return getCurrentAvatarUrl() != null;
    }

    public boolean isCurrent() {
        return getId() != null;
    }

    public boolean isRole(Role role){
        return getRole() == role;
    }

    public boolean isNotRole(Role role){
        return !isRole(role);
    }
}

package com.dcconnect.minimizingwaste.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "users")
public class User extends BaseEntity{

    private String name;
    private String cpf;
    private String email;
    private String whatsApp;
    private String password;
    private String office;
    private String occupation;

    private String literate;

    @CreationTimestamp
    private OffsetDateTime createdAt;

    @ManyToMany
    @JoinTable(name = "users_access_groups", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "access_group_id"))
    private List<AccessGroup> accessGroups = new ArrayList<>();

    public boolean passwordMatches(String password){
        return getPassword().equals(password);
    }

    public boolean passwordDoesNotMatch(String password){
        return !passwordMatches(password);
    }

    public boolean removeAccessGroup(AccessGroup accessGroup){
        return getAccessGroups().remove(accessGroup);
    }

    public boolean addAccessGroups(AccessGroup accessGroup){
        return getAccessGroups().add(accessGroup);
    }
}

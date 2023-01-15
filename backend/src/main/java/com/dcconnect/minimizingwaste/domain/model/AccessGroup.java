package com.dcconnect.minimizingwaste.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "access_groups")
public class AccessGroup extends BaseEntity {

    private String name;

    @ManyToMany
    @JoinTable(name = "groups_permissions", joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id"))
    private List<Permission> permissions = new ArrayList<>();

    public boolean removePermission(Permission permission){
        return getPermissions().remove(permission);
    }

    public boolean addPermission(Permission permission) {
        return getPermissions().add(permission);
    }

}

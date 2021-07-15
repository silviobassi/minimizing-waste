package com.dcconnect.minimizingwaste.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter

@Entity
@Table(name = "users")
public class User extends BaseEntity{

    private String name;
    private String cpf;
    private String email;
    private String password;
    private String office;
    private String occupation;
    private boolean literate;

    @OneToMany
    private List<EmployeeMovement> employeesMovement = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "users_tasks", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id"))
    private List<Task> tasks;

    @ManyToMany
    @JoinTable(name = "users_groups", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<Group> groups = new HashSet<>();
}

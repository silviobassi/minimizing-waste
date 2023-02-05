package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.UserDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.PasswordInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.UserControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.UserFilter;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import com.dcconnect.minimizingwaste.infrastructure.spec.UserSpecs;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/users")
public class UserController implements UserControllerOpenApi {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserAssembler userAssembler;

    @Autowired
    private UserDisassembler userDisassembler;

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public CollectionModel<UserDetailedModel> search(UserFilter userFilter) {

        List<User> users = userRepository.findAll(UserSpecs.usingFilter(userFilter));

        return userAssembler.toCollectionModel(users);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public UserDetailedModel create(@RequestBody @Valid UserInput userInput){
        User user = userDisassembler.toDomainObject(userInput);
        user = userService.create(user);
        return userAssembler.toModel(user);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{userId}")
    public UserDetailedModel update(@PathVariable Long userId, @RequestBody @Valid UserInput userInput){
        User currentUser =  userService.findOrFail(userId);
        userDisassembler.copyToDomainModel(userInput, currentUser);
        currentUser = userService.create(currentUser);

        return userAssembler.toModel(currentUser);
    }

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{userId}")
    public UserDetailedModel findOrFail(@PathVariable Long userId){
        User user = userService.findOrFail(userId);

        return userAssembler.toModel(user);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{userId}/password")
    public void changePassword(@PathVariable Long userId, @RequestBody @Valid PasswordInput passwordInput){
        userService.changePassword(userId, passwordInput.getCurrentPassword(), passwordInput.getNewPassword());
    }


}
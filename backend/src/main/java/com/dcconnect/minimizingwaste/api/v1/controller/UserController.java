package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.UserDisassembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.UserUpdateDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.PasswordInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserUpdateInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.UserControllerOpenApi;
import com.dcconnect.minimizingwaste.core.data.PageWrapper;
import com.dcconnect.minimizingwaste.core.data.PageableTranslator;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import com.dcconnect.minimizingwaste.domain.repository.filter.UserFilter;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import com.dcconnect.minimizingwaste.infrastructure.spec.UserSpecs;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.FileSystem;
import java.nio.file.Path;
import java.util.Map;

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

    @Autowired
    private UserUpdateDisassembler userUpdateDisassembler;

    @Autowired
    private PagedResourcesAssembler<User> pagedResourcesAssembler;

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PagedModel<UserDetailedModel> search(UserFilter userFilter, @PageableDefault(size = 10) Pageable pageable) {

        Pageable translatedPageable = pageableTranslate(pageable);

        Page<User> usersPage = userRepository.findAll(UserSpecs.usingFilter(userFilter), translatedPageable);

        usersPage = new PageWrapper<>(usersPage, pageable);

        return pagedResourcesAssembler.toModel(usersPage, userAssembler);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public UserDetailedModel create(@RequestBody @Valid UserInput userInput) {
        User user = userDisassembler.toDomainObject(userInput);
        user = userService.create(user);
        return userAssembler.toModel(user);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{userId}")
    public UserDetailedModel update(@PathVariable Long userId, @RequestBody @Valid UserUpdateInput userUpdateInput) {
        User currentUser = userService.findOrFail(userId);
        String avatarUrl = currentUser.getAvatarUrl();

        userUpdateDisassembler.copyToDomainModel(userUpdateInput, currentUser);
        currentUser.setCurrentAvatarUrl(avatarUrl);
        currentUser = userService.create(currentUser);
        return userAssembler.toModel(currentUser);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{userId}")
    public void delete(@PathVariable Long userId) {
        User currentUser = userService.findOrFail(userId);
        currentUser.setCurrentAvatarUrl(currentUser.getAvatarUrl());
        userService.delete(currentUser);
    }


    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{userId}")
    public UserDetailedModel findOrFail(@PathVariable Long userId) {
        User user = userService.findOrFail(userId);

        return userAssembler.toModel(user);
    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{userId}/password")
    public void changePassword(@PathVariable Long userId, @RequestBody @Valid PasswordInput passwordInput) {
        userService.changePassword(userId, passwordInput.getCurrentPassword(), passwordInput.getNewPassword());
    }

    private Pageable pageableTranslate(Pageable apiPageable) {
        var mapping = Map.of(
                "name", "name",
                "cpf", "cpf"
        );

        return PageableTranslator.translate(apiPageable, mapping);
    }
}
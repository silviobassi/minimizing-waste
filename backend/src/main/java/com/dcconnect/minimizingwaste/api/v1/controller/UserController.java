package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.UserDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.PasswordInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.UserControllerOpenApi;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @Autowired
    private PagedResourcesAssembler<User> pagedResourcesAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PagedModel<UserDetailedModel> all(@PageableDefault(size = 2) Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return pagedResourcesAssembler.toModel(users, userAssembler);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public UserDetailedModel create(@RequestBody @Valid UserInput userInput){
        User user = userDisassembler.toDomainObject(userInput);
        user = userService.create(user);
        return userAssembler.toModel(user);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{userId}")
    public UserDetailedModel update(@PathVariable Long userId, @RequestBody @Valid UserInput userInput){
        User currentUser =  userService.findOrFail(userId);
        userDisassembler.copyToDomainModel(userInput, currentUser);
        currentUser = userService.create(currentUser);

        return userAssembler.toModel(currentUser);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{userId}")
    public UserDetailedModel findOrFail(@PathVariable Long userId){
        User user = userService.findOrFail(userId);

        return userAssembler.toModel(user);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{userId}/password")
    public void changePassword(@PathVariable Long userId, @RequestBody @Valid PasswordInput passwordInput){
        userService.changePassword(userId, passwordInput.getCurrentPassword(), passwordInput.getNewPassword());
    }

}
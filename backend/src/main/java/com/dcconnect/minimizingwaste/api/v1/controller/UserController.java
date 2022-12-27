package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.UserDisassembler;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailed;
import com.dcconnect.minimizingwaste.api.v1.model.input.PasswordInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserInput;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserAssembler userAssembler;

    @Autowired
    private UserDisassembler userDisassembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<UserDetailed> all() {
        List<User> users = userRepository.findAll();
        return userAssembler.toCollectionModel(users);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public UserDetailed create(@RequestBody @Valid UserInput userInput){
        User user = userDisassembler.toDomainObject(userInput);
        user = userService.create(user);
        return userAssembler.toModel(user);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{userId}")
    public UserDetailed update(@PathVariable Long userId, @RequestBody @Valid UserInput userInput){
        User currentUser =  userService.findOrFail(userId);
        userDisassembler.copyToDomainModel(userInput, currentUser);
        currentUser = userService.create(currentUser);

        return userAssembler.toModel(currentUser);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{userId}")
    public UserDetailed findOrFail(@PathVariable Long userId){
        User user = userService.findOrFail(userId);

        return userAssembler.toModel(user);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{userId}/password")
    public void changePassword(@PathVariable Long userId, @RequestBody @Valid PasswordInput passwordInput){
        userService.changePassword(userId, passwordInput.getCurrentPassword(), passwordInput.getNewPassword());
    }

}
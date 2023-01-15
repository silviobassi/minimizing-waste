package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserPhotoService {

    @Autowired UserRepository userRepository;
    @Transactional
    public UserPhoto create(UserPhoto userPhoto){
        Optional<UserPhoto> currentUserPhoto = userRepository.findByPhoto(userPhoto.getUser().getId());
        currentUserPhoto.ifPresent(photo -> userRepository.delete(photo));
        return userRepository.save(userPhoto);
    }

}

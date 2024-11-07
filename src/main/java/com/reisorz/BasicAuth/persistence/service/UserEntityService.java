package com.reisorz.BasicAuth.persistence.service;

import com.reisorz.BasicAuth.persistence.entity.UserEntity;
import com.reisorz.BasicAuth.persistence.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserEntityService implements IUserEntityService{

    @Autowired
    private UserEntityRepository userEntityRepository;


    @Override
    public List<UserEntity> listUsers() {
        return userEntityRepository.findAll();
    }

    @Override
    public Optional<UserEntity> searchUserById(Long userId) {
        return userEntityRepository.findById(userId);
    }

    @Override
    public UserEntity saveUser(UserEntity user) {
        return userEntityRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {
        userEntityRepository.findById(userId).ifPresent(user -> userEntityRepository.delete(user));
    }

    @Override
    public Optional<UserEntity> findUserEntityByUsername(String username) {
        return userEntityRepository.findUserEntityByUsername(username);
    }
}

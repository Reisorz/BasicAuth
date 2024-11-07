package com.reisorz.BasicAuth.persistence.service;

import com.reisorz.BasicAuth.persistence.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface IUserEntityService {

    public List<UserEntity> listUsers();

    public Optional<UserEntity> searchUserById(Long userId);

    public UserEntity saveUser(UserEntity user);

    public void deleteUser(Long userId);

    Optional<UserEntity> findUserEntityByUsername(String username);
}

package com.reisorz.BasicAuth.persistence.repository;

import com.reisorz.BasicAuth.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserEntityRepository extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findUserByUsername(String username);

}

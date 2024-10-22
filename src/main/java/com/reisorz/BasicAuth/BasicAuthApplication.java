package com.reisorz.BasicAuth;

import com.reisorz.BasicAuth.persistence.entity.PermissionEntity;
import com.reisorz.BasicAuth.persistence.entity.RoleEntity;
import com.reisorz.BasicAuth.persistence.entity.RoleEnum;
import com.reisorz.BasicAuth.persistence.entity.UserEntity;
import com.reisorz.BasicAuth.persistence.repository.UserEntityRepository;
import com.reisorz.BasicAuth.persistence.service.UserEntityService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Set;

@SpringBootApplication
public class BasicAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(BasicAuthApplication.class, args);
	}


}

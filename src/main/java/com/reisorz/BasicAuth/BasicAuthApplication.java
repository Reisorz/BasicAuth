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

//	@Bean
//	CommandLineRunner init(UserEntityRepository userEntityRepository) {
//		return args -> {
//
//			//Create PERMISSIONS
//			PermissionEntity createPermission = new PermissionEntity();
//			createPermission.setPermissionName("CREATE");
//
//			PermissionEntity readPermission = new PermissionEntity();
//			readPermission.setPermissionName("READ");
//
//			PermissionEntity updatePermission = new PermissionEntity();
//			updatePermission.setPermissionName("UPDATE");
//
//			PermissionEntity deletePermission = new PermissionEntity();
//			deletePermission.setPermissionName("DELETE");
//
//			RoleEntity roleAdmin = new RoleEntity();
//			roleAdmin.setRoleEnum(RoleEnum.ADMIN);
//			roleAdmin.setPermissionList(Set.of(createPermission,readPermission,updatePermission,deletePermission));
//
//			RoleEntity roleUser = new RoleEntity();
//			roleUser.setRoleEnum(RoleEnum.USER);
//			roleUser.setPermissionList(Set.of(createPermission,readPermission));
//
//			RoleEntity roleInvited = new RoleEntity();
//			roleInvited.setRoleEnum(RoleEnum.INVITED);
//			roleInvited.setPermissionList(Set.of(readPermission));
//
//			//Create USERS
//
//			UserEntity userSantiago = UserEntity.builder()
//					.username("miguel")
//					.password("1234")
//					.isEnabled(true)
//					.accountNoExpired(true)
//					.accountNoLocked(true)
//					.credentialNoExpired(true)
//					.roles(Set.of(roleAdmin))
//					.build();
//
//			UserEntity userDaniel = UserEntity.builder()
//					.username("jose")
//					.password("1234")
//					.isEnabled(true)
//					.accountNoExpired(true)
//					.accountNoLocked(true)
//					.credentialNoExpired(true)
//					.roles(Set.of(roleUser))
//					.build();
//
//			UserEntity userAndrea = UserEntity.builder()
//					.username("angel")
//					.password("1234")
//					.isEnabled(true)
//					.accountNoExpired(true)
//					.accountNoLocked(true)
//					.credentialNoExpired(true)
//					.roles(Set.of(roleInvited))
//					.build();
//
//
//
//			userEntityRepository.saveAll(Set.of(userSantiago,userAndrea,userDaniel));
//
//		};
//	}
}

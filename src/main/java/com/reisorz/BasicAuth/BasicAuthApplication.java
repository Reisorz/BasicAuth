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
//Uncomment this section to create Roles, Permissions and first User in Database, then run it once. Then comment it again to avoid problems.
//You will need to change add cascadeType.ALL in userEntity to make it work.

//  @Bean
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
//			//Create ROLES
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
//			UserEntity userMiguel = UserEntity.builder()
//					.username("miguel")
//					.name("Miguel Surname")
//					.email("miguel@mail.com")
//					.password("Miguel1234$")
//					.enabled(true)
//					.accountNonExpired(true)
//					.accountNonLocked(true)
//					.credentialNonExpired(true)
//					.roles(Set.of(roleAdmin, roleUser, roleInvited))
//					.build();
//
//
//
//			userEntityRepository.saveAll(Set.of(userMiguel));
//
//		};
//	}

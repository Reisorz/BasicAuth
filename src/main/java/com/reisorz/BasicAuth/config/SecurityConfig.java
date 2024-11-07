package com.reisorz.BasicAuth.config;

import com.reisorz.BasicAuth.persistence.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(Customizer.withDefaults()) //Basic Authentication
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests( http -> {
                    //Public endpoints
                    http.requestMatchers(HttpMethod.POST, "/basic-auth/register").anonymous();
                    http.requestMatchers(HttpMethod.GET, "/basic-auth/get-role-by-id/{id}").anonymous();
                    http.requestMatchers(HttpMethod.GET, "/basic-auth/get-user-by-username/{username}").anonymous();
                    http.requestMatchers(HttpMethod.POST, "/basic-auth/login-pass").anonymous();



                    //Private endpoints
                    http.requestMatchers(HttpMethod.GET, "/basic-auth/get-users-list").hasAnyRole("ADMIN","USER" );
                    http.requestMatchers(HttpMethod.PUT, "/basic-auth/edit-user").hasAnyRole("ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/basic-auth/get-user-by-id/{userId}").hasAnyRole("ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/basic-auth/get-roles").hasAnyRole("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/basic-auth/delete-user/{id}").hasAnyRole("ADMIN");

                    //Rest of endpoints - Not specified
                    http.anyRequest().denyAll();
                })
                .build();
    }

    //Config to allow crossOrigin
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:4200");  // Origin definition
        config.addAllowedMethod("*");  // Allow all Http methods (PUT, POST, GET, etc.)
        config.addAllowedHeader("*");  // Allow all headers
        config.setAllowCredentials(true);  // Allows credentials

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);  // Applies CORS configuration to all routes

        return new CorsFilter(source);
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsServiceImpl userDetailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
        //return NoOpPasswordEncoder.getInstance();
    }


}

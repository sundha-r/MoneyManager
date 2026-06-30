package com.sundhar.moneymanager.config;

import com.sundhar.moneymanager.security.JwtRequestFilter;
import com.sundhar.moneymanager.service.AppUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    public final AppUserDetailsService appUserDetailsService;
    public final JwtRequestFilter jwtRequestFilter;

    @Value("${money.manager.frontend.url}")
    private String frontEndUrl;

    //create a bean for security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http){
       return  http
               .cors(Customizer.withDefaults())
               .csrf(AbstractHttpConfigurer::disable) //.csrf(csrf-> csrf.disable()) csrfConfigure intenally inherit the AbstractHttpConfigure
               .authorizeHttpRequests(request-> request.requestMatchers("/status","/health","/register","/activate","/login","/error").permitAll()
                       .anyRequest().authenticated())
               .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
               .build();

    }
    //create a bean for password encoder to encrypt the user-password
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(12);
    }

    //bean for cros configurationsource to enable cors policy
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                frontEndUrl
        ));
        configuration.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider(appUserDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authenticationProvider);


    }
}

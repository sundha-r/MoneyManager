package com.sundhar.moneymanager.service;

import com.sundhar.moneymanager.dto.AuthDTO;
import com.sundhar.moneymanager.dto.ProfileDTO;
import com.sundhar.moneymanager.entity.ProfileEntity;
import com.sundhar.moneymanager.repository.ProfileRepository;
import com.sundhar.moneymanager.util.JwtUtil;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Value("${app.activation.url}")
    private String activationURl;


    public ProfileDTO registerProfile(ProfileDTO profileDTO){
       ProfileEntity newProfile= toEntity(profileDTO);
       newProfile.setActivationToken(UUID.randomUUID().toString());

       newProfile= profileRepository.save(newProfile);
       //send activation email
        String activationLink=activationURl+"/api/v1.0/activate?token="+newProfile.getActivationToken();
        String subject="Activate your Money Manager account";
        String body="Click on the following link to activate your account: "+activationLink;
        emailService.sendEmail(newProfile.getEmail(), subject,body);
        return toDTO(newProfile);
    }
    //helper for profileEntity

    public ProfileEntity toEntity(ProfileDTO profileDTO){
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullname(profileDTO.getFullname())
                .email(profileDTO.getEmail())
                .password(passwordEncoder.encode(profileDTO.getPassword()))
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(ProfileEntity profileEntity){
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullname(profileEntity.getFullname())
                .email(profileEntity.getEmail())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public Boolean activateProfile(String activationToken){
        return profileRepository.findByActivationToken(activationToken)
                .map(profile ->{
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                }).orElse(false);
    }

    public Boolean isAccountActive(String email){
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile(){
        // Authentication stores The currently logged-in user's authentication information.
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication(); // SecurityContextHolder-> return the details of Who is currently logged in? automatically.
        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(()->new UsernameNotFoundException("Profile not found with email: "+authentication.getName()));
    }

    public ProfileDTO getPublicProifle(String email){
        ProfileEntity currentUser=null;
        if(email== null){
            currentUser=getCurrentProfile();
        }
        else{
            currentUser=profileRepository.findByEmail(email)
                    .orElseThrow(()->new UsernameNotFoundException("Profile not found with email: "+email));
        }
        return ProfileDTO.builder()
                .id(currentUser.getId())
                .fullname(currentUser.getFullname())
                .email(currentUser.getEmail())
                .profileImageUrl(currentUser.getProfileImageUrl())
                .createdAt(currentUser.getCreatedAt())
                .updatedAt(currentUser.getUpdatedAt())
                .build();
    }

    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDTO.getEmail(),authDTO.getPassword()));
           //Generate JWt token
            String token= jwtUtil.generateToken(authDTO.getEmail());
            return Map.of(
                    "token",token,
                    "user",getPublicProifle(authDTO.getEmail())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid username for password");
        }
    }
}

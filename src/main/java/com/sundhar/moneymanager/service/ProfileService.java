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
        String baseActivationUrl = activationURl;
        if (baseActivationUrl != null && baseActivationUrl.contains("localhost")) {
            try {
                String localIp = java.net.InetAddress.getLocalHost().getHostAddress();
                baseActivationUrl = baseActivationUrl.replace("localhost", localIp);
            } catch (Exception e) {
                // Fallback to original if IP resolution fails
            }
        }
        String activationLink=baseActivationUrl+"/api/v1.0/activate?token="+newProfile.getActivationToken();
        String subject="Activate your Money Manager account";
        String body = """
                <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 550px; margin: 30px auto; padding: 40px 30px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); border: 1px solid #f0f0f0; text-align: center;">
                  <div style="margin-bottom: 30px;">
                    <span style="background-color: #e0e7ff; color: #4f46e5; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">Security</span>
                  </div>
                  <h2 style="color: #1e1b4b; font-size: 24px; font-weight: 700; margin-top: 0; margin-bottom: 12px; letter-spacing: -0.5px;">Verify Your Email Address</h2>
                  <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 32px; max-width: 420px; margin-left: auto; margin-right: auto;">
                    Welcome to Money Manager! Please click the button below to confirm your account and start your financial journey.
                  </p>
                  <div style="margin-bottom: 36px;">
                    <a href="%s" style="display: inline-block; background: #4f46e5; background: linear-gradient(135deg, #6366f1 0%%, #4f46e5 100%%); color: #ffffff; text-decoration: none; padding: 14px 36px; font-size: 15px; font-weight: 600; border-radius: 10px; box-shadow: 0 8px 20px rgba(79, 70, 229, 0.25);">Activate Account</a>
                  </div>
                  <div style="border-top: 1px solid #f3f4f6; padding-top: 24px; margin-top: 30px;">
                    <p style="color: #9ca3af; font-size: 12px; margin-bottom: 8px;">If the button doesn't work, copy and paste this link in your browser:</p>
                    <a href="%s" style="color: #6366f1; font-size: 13px; text-decoration: underline; word-break: break-all;">%s</a>
                  </div>
                </div>
                """.formatted(activationLink, activationLink, activationLink);
        //emailService.sendEmail(newProfile.getEmail(), subject,body);
        try {
            emailService.sendEmail(newProfile.getEmail(), subject, body);
        } catch (Exception e) {
            System.out.println("MAIL ERROR => " + e.getMessage());
        }
        return toDTO(newProfile);
    }
    //helper for profileEntity

    public ProfileEntity toEntity(ProfileDTO profileDTO){
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
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
                .fullName(profileEntity.getFullName())
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
                .fullName(currentUser.getFullName())
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
            throw new RuntimeException("Invalid username or password");
        }
    }
}

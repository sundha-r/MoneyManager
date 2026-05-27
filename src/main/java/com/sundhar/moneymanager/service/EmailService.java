package com.sundhar.moneymanager.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    public final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;
    public void sendEmail(String to,String subject,String body){

        System.out.println("MAIL USER => " + fromEmail);
//        try{
//            SimpleMailMessage message=new SimpleMailMessage();
//            message.setFrom(formEmail);
//            message.setTo(to);
//            message.setSubject(subject);
//            message.setText(body);
//            mailSender.send(message);
//        } catch (Exception e) {
//            throw new RuntimeException("failed to send mail "+e.getMessage());
//        }
        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);

            // true = HTML email
            helper.setText(body, true);
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("failed to send mail " + e.getMessage());
        }
    }
}
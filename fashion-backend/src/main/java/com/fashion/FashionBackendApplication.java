package com.fashion;

import com.fashion.entity.User;
import com.fashion.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class FashionBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FashionBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner setupDefaultUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByUsername("admin").isEmpty()) {
				User admin = new User(null, "admin", passwordEncoder.encode("12345"), "admin@fashion.com");
				userRepository.save(admin);
				System.out.println("Default user 'admin' with password '12345' created.");
			}
		};
	}

}

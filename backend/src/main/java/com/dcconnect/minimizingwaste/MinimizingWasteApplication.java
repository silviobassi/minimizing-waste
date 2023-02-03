package com.dcconnect.minimizingwaste;

import java.util.TimeZone;

import com.dcconnect.minimizingwaste.core.io.Base64ProtocolResolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.dcconnect.minimizingwaste.infrastructure.repository.CustomJpaRepositoryImpl;

@SpringBootApplication
@EnableJpaRepositories(repositoryBaseClass = CustomJpaRepositoryImpl.class)
public class MinimizingWasteApplication {

	public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication app = new SpringApplication(MinimizingWasteApplication.class);
		app.addListeners(new Base64ProtocolResolver());
		app.run(args);
	}

}

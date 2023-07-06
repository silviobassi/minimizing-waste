package com.dcconnect.minimizingwaste.core.security;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties("minimizing-waste.security.redirect")
public class SecurityRedirectProperties {

    @NotBlank
    private String client;

}

package com.dcconnect.minimizingwaste.core.security.authorizationserver;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Component
@Getter
@Setter
@Validated
@ConfigurationProperties("minimizing-waste.auth")
public class MinimizingWasteSecurityProperties {

    @NotBlank
    private String providerUrl;

}

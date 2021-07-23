package com.dcconnect.minimizingwaste.core.modelmapper;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper(){
    	
        ModelMapper modelMapper = new ModelMapper();

        //modelMapper.createTypeMap(SupplyMovementInput.class, SupplyMovement.class)
          //      .addMapping(SupplyMovementInput::getReservedQuantity, SupplyMovement::setAllocatedQuantity);

        return modelMapper;
    }
}

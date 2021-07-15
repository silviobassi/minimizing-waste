package com.dcconnect.minimizingwaste.core.modelmapper;

import com.dcconnect.minimizingwaste.api.v1.model.input.SupplyMovementInput;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
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

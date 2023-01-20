package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;

public interface CalculateService {

    public void whenCreatingMovement(SupplyMovement supplyMovement);

    public void whenUpdatingMovement(SupplyMovement supplyMovement, Long supplyId);

    public void whenReplaceSupply(SupplyMovement currentSupplyMovement, Long supplyId);

    public void whenDeleting(SupplyMovement supplyMovement);

}

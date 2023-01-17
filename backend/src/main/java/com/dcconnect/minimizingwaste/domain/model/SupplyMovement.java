package com.dcconnect.minimizingwaste.domain.model;

import java.time.OffsetDateTime;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "supplies_movement")
public class SupplyMovement extends BaseEntity{

    @CreationTimestamp
    private OffsetDateTime createAt;

    private boolean notBusy;
    private boolean movable;
    private Long allocatedQuantity;

    @Transient
    private Long reservedQuantity;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "work_station_id")
    private WorkStation workStation;
    
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "supply_id")
    private Supply supply;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_responsible_id")
    private User employeeResponsible;

    @PrePersist
    public void prePersist(){
        notBusy = false;
    }

    public void vacate(){
        setNotBusy(true);
        setMovable(true);
    }

    public void devolveAllocatedQuantity(){
        allocatedQuantity -= reservedQuantity;
        updateSupplyAmount();
    }

    public long sumAllocatedQuantityWithSuppliesQuantity() {
        return allocatedQuantity + supply.getSupplyDescription().getQuantity();
    }

    public boolean isDevolvedQuantityGreaterThanAllocatedQuantity() {
        return reservedQuantity > allocatedQuantity;
    }

    public boolean isAllocatedQuantityGreaterThanSupplyQuantity(){
       return reservedQuantity > supply.getSupplyDescription().getQuantity();
    }

    public boolean isReservedQuantityGreaterThanAvailableQuantity() {
        return reservedQuantity > sumAllocatedQuantityWithSuppliesQuantity();
    }

    private void updateSupplyAmount(){
        supply.getSupplyDescription().setQuantity(
                supply.getSupplyDescription().getQuantity() + getReservedQuantity());
    }


}

package com.dcconnect.minimizingwaste.domain.model;

import java.time.OffsetDateTime;

import javax.persistence.*;

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

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @ManyToOne(optional = false)
    @JoinColumn(name = "work_station_id")
    private WorkStation workStation;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "supply_id")
    private Supply supply;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employee_responsible_id")
    private User user;

    @PrePersist
    public void prePersist(){
        notBusy = false;
        allocatedQuantity = reservedQuantity;
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

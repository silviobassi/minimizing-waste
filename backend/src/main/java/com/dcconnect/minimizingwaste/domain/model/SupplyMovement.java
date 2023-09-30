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

    public boolean isNew(){
        return getId() == null;
    }

    public boolean isNotNew(){
        return !isNew();
    }

    public boolean isNotBusy() {
        return notBusy;
    }

    public boolean isBusy(){
        return !isNotBusy();
    }

    @PrePersist
    public void prePersist() {
        notBusy = true;
        if(getAllocatedQuantity() == null)
            setAllocatedQuantity(0L);
    }

    public void vacate(){
        setNotBusy(!notBusy);
    }
    public void devolveAllocatedQuantity(){
        allocatedQuantity -= reservedQuantity;
    }

    public  void decreaseSupply() {
        getSupply().getSupplyDescription().setQuantity(
                getSupply().getSupplyDescription().getQuantity() - getAllocatedQuantity()
        );
    }

    public void decreaseAllocated(){
        setAllocatedQuantity(0L);
    }

    public  boolean isQuantityReservedGreaterThanAllocated() {
        if(getAllocatedQuantity() != null)
            return getReservedQuantity() > getAllocatedQuantity();
        return false;
    }


}

package pk.wishfaah.backend.customer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "customers",
        indexes = {
                @Index(name = "idx_customer_email", columnList = "email", unique = true),
                @Index(name = "idx_customer_primary_phone", columnList = "primary_phone")
        }
)
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 150, unique = true)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "primary_phone", nullable = false, length = 20)
    private String primaryPhoneNumber;

    @Column(name = "secondary_phone", length = 20)
    private String secondaryPhoneNumber;

    // Automated collection table to cleanly store multiple addresses
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
            name = "customer_addresses",
            joinColumns = @JoinColumn(name = "customer_id", foreignKey = @ForeignKey(name = "fk_addresses_customer"))
    )
    private List<Address> addresses = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
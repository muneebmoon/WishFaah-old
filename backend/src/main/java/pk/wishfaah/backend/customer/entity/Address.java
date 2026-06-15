package pk.wishfaah.backend.customer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Address {

    @Column(nullable = false, length = 50)
    private String label; // e.g., "Home", "Office", "Default Shipping"

    @Column(name = "full_address", nullable = false, length = 500)
    private String fullAddress;

    @Column(length = 100)
    private String city;

    // --- Constructors ---
    public Address() {}

    public Address(String label, String fullAddress, String city) {
        this.label = label;
        this.fullAddress = fullAddress;
        this.city = city;
    }
}
package pk.wishfaah.backend.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.wishfaah.backend.customer.entity.Customer;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    // 1. Used for secure login and authentication lookups
    Optional<Customer> findByEmail(String email);

    // 2. Used during registration to check for duplicate accounts instantly
    boolean existsByEmail(String email);

    // 3. Fast profile search by customer phone number
    Optional<Customer> findByPrimaryPhoneNumber(String primaryPhoneNumber);
}
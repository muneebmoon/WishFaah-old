package pk.wishfaah.backend.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pk.wishfaah.backend.customer.dto.AddressDto;
import pk.wishfaah.backend.customer.dto.CustomerRequest;
import pk.wishfaah.backend.customer.dto.CustomerResponse;
import pk.wishfaah.backend.customer.entity.Address;
import pk.wishfaah.backend.customer.entity.Customer;
import pk.wishfaah.backend.customer.exception.CustomerNotFoundException;
import pk.wishfaah.backend.customer.exception.EmailAlreadyExistsException;
import pk.wishfaah.backend.customer.repository.CustomerRepository;

import java.util.Collections;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder passwordEncoder; // Fixed: Ensuring secure hashing out of the box

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, BCryptPasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public CustomerResponse registerCustomer(CustomerRequest request) {
        // 1. Enforce unique email check using our high-speed repository helper
        if (customerRepository.existsByEmail(request.email().trim().toLowerCase())) {
            throw new EmailAlreadyExistsException(request.email());
        }

        // 2. Map request details to Entity
        Customer customer = new Customer();
        customer.setName(request.name().trim());
        customer.setEmail(request.email().trim().toLowerCase());

        // 3. Hash the raw password before saving it to the database
        String hashedPassword = passwordEncoder.encode(request.password());
        customer.setPassword(hashedPassword);

        customer.setPrimaryPhoneNumber(request.primaryPhoneNumber().trim());
        customer.setSecondaryPhoneNumber(request.secondaryPhoneNumber() != null ? request.secondaryPhoneNumber().trim() : null);

        // 4. Map and attach addresses safely
        if (request.addresses() != null) {
            List<Address> addressEntities = request.addresses().stream()
                    .map(dto -> new Address(dto.label().trim(), dto.fullAddress().trim(), dto.city().trim()))
                    .toList();
            customer.setAddresses(addressEntities);
        }

        Customer savedCustomer = customerRepository.save(customer);
        return toResponse(savedCustomer);
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponse getCustomerById(Integer id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));
        return toResponse(customer);
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponse getCustomerByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new CustomerNotFoundException(email));
        return toResponse(customer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public CustomerResponse updateCustomerProfile(CustomerRequest request, Integer id) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));

        // Enforce unique email logic if they are attempting to alter their login address
        String incomingEmail = request.email().trim().toLowerCase();
        if (!existingCustomer.getEmail().equals(incomingEmail) && customerRepository.existsByEmail(incomingEmail)) {
            throw new EmailAlreadyExistsException(incomingEmail);
        }

        // Update basic fields
        existingCustomer.setName(request.name().trim());
        existingCustomer.setEmail(incomingEmail);
        existingCustomer.setPrimaryPhoneNumber(request.primaryPhoneNumber().trim());
        existingCustomer.setSecondaryPhoneNumber(request.secondaryPhoneNumber() != null ? request.secondaryPhoneNumber().trim() : null);

        // Update password securely if they passed a new one
        if (request.password() != null && !request.password().isBlank()) {
            existingCustomer.setPassword(passwordEncoder.encode(request.password()));
        }

        // Clean out and safely reset embedded address value collections
        existingCustomer.getAddresses().clear();
        if (request.addresses() != null) {
            List<Address> updatedAddresses = request.addresses().stream()
                    .map(dto -> new Address(dto.label().trim(), dto.fullAddress().trim(), dto.city().trim()))
                    .toList();
            existingCustomer.getAddresses().addAll(updatedAddresses);
        }

        Customer updatedCustomer = customerRepository.save(existingCustomer);
        return toResponse(updatedCustomer);
    }

    @Override
    @Transactional
    public void deleteCustomer(Integer id) {
        if (!customerRepository.existsById(id)) {
            throw new CustomerNotFoundException(id);
        }
        customerRepository.deleteById(id);
    }

    // --- Secure Mapping Helper ---
    private CustomerResponse toResponse(Customer customer) {
        List<AddressDto> addressDtos = Collections.emptyList();

        // Extract embedded addresses lazily safely
        if (customer.getAddresses() != null) {
            addressDtos = customer.getAddresses().stream()
                    .map(addr -> new AddressDto(addr.getLabel(), addr.getFullAddress(), addr.getCity()))
                    .toList();
        }

        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPrimaryPhoneNumber(),
                customer.getSecondaryPhoneNumber(),
                addressDtos,
                customer.getCreatedAt(),
                customer.getUpdatedAt()
        );
    }
}
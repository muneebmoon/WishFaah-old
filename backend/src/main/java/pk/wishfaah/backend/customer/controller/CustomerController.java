package pk.wishfaah.backend.customer.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pk.wishfaah.backend.customer.dto.CustomerRequest;
import pk.wishfaah.backend.customer.dto.CustomerResponse;
import pk.wishfaah.backend.customer.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    /**
     * POST /api/v1/customers/register
     * Registers a new customer account.
     */
    @PostMapping("/register")
    public ResponseEntity<CustomerResponse> registerCustomer(@Valid @RequestBody CustomerRequest request) {
        CustomerResponse response = customerService.registerCustomer(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED); // 201 Created
    }

    /**
     * GET /api/v1/customers/{id}
     * Retrieves a single customer profile by their numeric ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(@PathVariable Integer id) {
        CustomerResponse response = customerService.getCustomerById(id);
        return ResponseEntity.ok(response); // 200 OK
    }

    /**
     * GET /api/v1/customers/email?value=customer@email.com
     * Retrieves a customer profile by their unique email address.
     */
    @GetMapping("/email")
    public ResponseEntity<CustomerResponse> getCustomerByEmail(@RequestParam("value") String email) {
        CustomerResponse response = customerService.getCustomerByEmail(email);
        return ResponseEntity.ok(response); // 200 OK
    }

    /**
     * GET /api/v1/customers
     * Retrieves all registered customer profiles (Admin / Operations visibility).
     */
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        List<CustomerResponse> responseList = customerService.getAllCustomers();
        return ResponseEntity.ok(responseList); // 200 OK
    }

    /**
     * PUT /api/v1/customers/{id}
     * Fully updates an existing customer profile details and addresses.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomerProfile(
            @PathVariable Integer id,
            @Valid @RequestBody CustomerRequest request) {
        CustomerResponse response = customerService.updateCustomerProfile(request, id);
        return ResponseEntity.ok(response); // 200 OK
    }

    /**
     * DELETE /api/v1/customers/{id}
     * Removes a customer account completely from the system catalog.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
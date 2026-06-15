package pk.wishfaah.backend.customer.service;

import pk.wishfaah.backend.customer.dto.CustomerRequest;
import pk.wishfaah.backend.customer.dto.CustomerResponse;

import java.util.List;

public interface CustomerService {

    CustomerResponse registerCustomer(CustomerRequest customerRequest);

    CustomerResponse getCustomerById(Integer id);

    CustomerResponse getCustomerByEmail(String email);

    List<CustomerResponse> getAllCustomers();

    CustomerResponse updateCustomerProfile(CustomerRequest customerRequest, Integer id);

    void deleteCustomer(Integer id);
}
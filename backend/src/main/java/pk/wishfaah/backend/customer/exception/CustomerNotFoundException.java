package pk.wishfaah.backend.customer.exception;


public class CustomerNotFoundException extends RuntimeException {

    public CustomerNotFoundException(Integer id) {
        super("Customer account not found with ID: " + id);
    }

    public CustomerNotFoundException(String email) {
        super("Customer account not found with Email: " + email);
    }
}
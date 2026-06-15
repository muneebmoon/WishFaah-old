package pk.wishfaah.backend.customer.exception;

import pk.wishfaah.backend.exceptions.ResourceAlreadyExistsException;

public class EmailAlreadyExistsException extends ResourceAlreadyExistsException {

    public EmailAlreadyExistsException(String email) {
        super("An account with the email '" + email + "' is already registered.");
    }
}
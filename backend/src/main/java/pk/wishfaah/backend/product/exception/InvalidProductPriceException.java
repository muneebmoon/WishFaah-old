package pk.wishfaah.backend.product.exception;


import pk.wishfaah.backend.exceptions.ResourceAlreadyExistsException;

public class InvalidProductPriceException extends ResourceAlreadyExistsException {

    public InvalidProductPriceException(String message) {
        super(message);
    }
}
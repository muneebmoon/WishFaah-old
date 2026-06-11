package pk.wishfaah.backend.category.exception;


import pk.wishfaah.backend.exceptions.ResourceAlreadyExistsException;

public class DuplicateCategoryException extends ResourceAlreadyExistsException {
    public DuplicateCategoryException(String message) {
        super(message);
    }
}
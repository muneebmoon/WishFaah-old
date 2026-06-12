package pk.wishfaah.backend.product.exception;


public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(Integer id) {
        super("Product not found with ID: " + id);
    }
}
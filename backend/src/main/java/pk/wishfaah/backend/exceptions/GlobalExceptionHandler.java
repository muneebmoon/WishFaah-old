package pk.wishfaah.backend.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.BAD_REQUEST;

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(status.value())
                .error(status.getReasonPhrase())
                .message("Validation failed for the request payload")
                .path(request.getRequestURI())
                .validationErrors(errors)
                .build();

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleConflict(
            ResourceAlreadyExistsException ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.CONFLICT; // 409

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(
            RuntimeException ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.NOT_FOUND;

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(status.value())
                .error(status.getReasonPhrase())
                .message("An unexpected error occurred on the server.")
                .path(request.getRequestURI())
                .build();

        return new ResponseEntity<>(errorResponse, status);
    }
}
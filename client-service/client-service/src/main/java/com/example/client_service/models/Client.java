package com.example.client_service.models;

import lombok.Data;
import java.time.LocalDate;

@Data
public class Client {
    private String sharedKey;
    private String businessId;
    private String email;
    private String phone;
    private LocalDate dateAdded;
}
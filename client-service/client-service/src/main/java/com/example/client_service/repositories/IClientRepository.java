package com.example.client_service.repositories;

import com.example.client_service.models.Client;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IClientRepository {
    List<Client> getAll();
    Optional<Client> findBySharedKey(String sharedKey);
    void add(Client client);

    List<Client> advancedSearch(
            String businessId,
            String email,
            String phone,
            LocalDate startDate,
            LocalDate endDate
    );
}
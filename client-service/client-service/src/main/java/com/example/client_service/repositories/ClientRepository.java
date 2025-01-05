package com.example.client_service.repositories;

import com.example.client_service.models.Client;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ClientRepository implements IClientRepository {
    private final List<Client> clients = new ArrayList<>();
    @Override
    public List<Client> getAll() {
        return clients;
    }

    @Override
    public Optional<Client> findBySharedKey(String sharedKey) {
        return clients.stream()
                .filter(client -> client.getSharedKey().equals(sharedKey))
                .findFirst();
    }

    @Override
    public void add(Client client) {
        clients.add(client);
    }

    @Override
    public List<Client> advancedSearch(
            String businessId,
            String email,
            String phone,
            LocalDate startDate,
            LocalDate endDate
    ) {
        return clients.stream()
                .filter(c -> businessId == null || c.getBusinessId().equalsIgnoreCase(businessId))
                .filter(c -> email == null || c.getEmail().equalsIgnoreCase(email))
                .filter(c -> phone == null || c.getPhone().equalsIgnoreCase(phone))
                .filter(c -> startDate == null || !c.getDateAdded().isBefore(startDate))
                .filter(c -> endDate == null || !c.getDateAdded().isAfter(endDate))
                .toList();
    }
}

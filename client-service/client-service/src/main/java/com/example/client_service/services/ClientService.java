package com.example.client_service.services;

import com.example.client_service.models.Client;
import com.example.client_service.unitofwork.UnitOfWork;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ClientService {
    private final UnitOfWork unitOfWork;

    public ClientService(UnitOfWork unitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    public List<Client> getAllClients() {
        return unitOfWork.clients().getAll();
    }

    public Optional<Client> getClientBySharedKey(String sharedKey) {
        return unitOfWork.clients().findBySharedKey(sharedKey);
    }

    public Client createClient(Client client) {
        client.setDateAdded(LocalDate.now());
        unitOfWork.clients().add(client);
        return client;
    }

    public List<Client> advancedSearch(
            String businessId,
            String email,
            String phone,
            LocalDate startDate,
            LocalDate endDate
    ) {
        return unitOfWork.clients().advancedSearch(businessId, email, phone, startDate, endDate);
    }
}

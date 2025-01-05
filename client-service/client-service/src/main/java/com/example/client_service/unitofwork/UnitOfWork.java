package com.example.client_service.unitofwork;

import com.example.client_service.repositories.IClientRepository;
import org.springframework.stereotype.Component;

@Component
public class UnitOfWork {
    private final IClientRepository clientRepository;

    public UnitOfWork(IClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public IClientRepository clients() {
        return clientRepository;
    }
}

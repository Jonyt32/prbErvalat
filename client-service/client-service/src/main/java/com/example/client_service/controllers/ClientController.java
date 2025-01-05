package com.example.client_service.controllers;

import com.example.client_service.models.Client;
import com.example.client_service.services.ClientService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(
        value = "/api/clients",
        produces = MediaType.APPLICATION_JSON_VALUE // Todas las respuestas serán application/json
)
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/{sharedKey}")
    public Optional<Client> getClientBySharedKey(@PathVariable String sharedKey) {
        return clientService.getClientBySharedKey(sharedKey);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Client createClient(@RequestBody Client client) {
        return clientService.createClient(client);
    }

    @GetMapping("/search")
    public List<Client> advancedSearch(
            @RequestParam(required = false) String businessId,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return clientService.advancedSearch(businessId, email, phone, startDate, endDate);
    }
}

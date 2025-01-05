import { Injectable } from '@angular/core';
import { ClientControllerService } from '../swagger/api/clientController.service'; // Importa el servicio generado
import { Client } from '../swagger/model/client'; // Importa el modelo generado
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private clientControllerService: ClientControllerService) {}

  /**
   * Obtener todos los clientes
   * @returns Observable<Array<Client>>
   */
  getAllClients(): Observable<Array<Client>> {
    return this.clientControllerService.getAllClients().pipe(
      map((data) => {
        console.log(data);
        return (Array.isArray(data) ? data : [])
      }), // Devuelve un array vacío si no es un array
      catchError((error) => {
        console.error('Error fetching all clients:', error);
        return of([]); // Manejo de errores con un array vacío
      })
    );
  }

  /**
   * Buscar cliente por Shared Key
   * @param sharedKey string
   * @returns Observable<Client>
   */
  getClientBySharedKey(sharedKey: string): Observable<Client | null> {
    return this.clientControllerService.getClientBySharedKey(sharedKey).pipe(
      map((data) => (data instanceof Blob ? null : data)), // Devuelve null si es un Blob
      catchError((error) => {
        console.error('Error fetching client by shared key:', error);
        return of(null); // Manejo de errores devolviendo null
      })
    );
  }

  /**
   * Crear un cliente
   * @param client Client
   * @returns Observable<Client>
   */
  createClient(client: Client): Observable<Client | null> {
    return this.clientControllerService.createClient(client).pipe(
      catchError((error) => {
        console.error('Error creating client:', error);
        return of(null); // Manejo de errores devolviendo null
      })
    );
  }

  /**
   * Búsqueda avanzada de clientes
   * @param businessId string | undefined
   * @param email string | undefined
   * @param phone string | undefined
   * @param startDate string | undefined (ISO format)
   * @param endDate string | undefined (ISO format)
   * @returns Observable<Array<Client>>
   */
  advancedSearch(
    businessId?: string,
    email?: string,
    phone?: string,
    startDate?: string,
    endDate?: string
  ): Observable<Array<Client>> {
    return this.clientControllerService
      .advancedSearch(businessId, email, phone, startDate, endDate)
      .pipe(
        map((data) => (Array.isArray(data) ? data : [])), // Devuelve un array vacío si no es un array
        catchError((error) => {
          console.error('Error during advanced search:', error);
          return of([]); // Manejo de errores con un array vacío
        })
      );
  }
}

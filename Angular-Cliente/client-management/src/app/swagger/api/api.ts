export * from './clientController.service';
import { ClientControllerService } from './clientController.service';
export * from './homeController.service';
import { HomeControllerService } from './homeController.service';
export const APIS = [ClientControllerService, HomeControllerService];

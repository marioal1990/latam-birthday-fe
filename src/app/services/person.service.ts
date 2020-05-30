import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../domains/person';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private API_LATAM_BIRTHDAY_BE = "http://localhost:8080/latam-birthday-be/api";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Llama al servicio LATAM-BIRTHDAY-BE y 
   * al método agregar persona y devuelve un objeto
   * @param person Datos de entrada del objeto Person
   */
  savePerson(person: Person): Observable<any> {
    return this.http.post(this.API_LATAM_BIRTHDAY_BE.concat("/birthdays"), person);
  }

  /**
   * Llama al servicio LATAM-BIRTHDAY-BE y devuelve una lista de personas
   */
  getAllPersons(): Observable<any> {
    return this.http.get(this.API_LATAM_BIRTHDAY_BE.concat("/persons"), this.httpOptions).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    return res || {}; // If 'res' is null, it returns empty object
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl2 = 'https://robohash.org/';
  private apiUrl = 'https://gutendex.com/books/?ids=1';

  constructor(private http: HttpClient) {}
  // constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  // Obtener la lista de Pokémon
  getlibros(limit: number = 5, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
                                          
  }

  // Obtener detalles de un Pokémon por nombre o ID
  getImageRobots(): Observable<any> {
    const randomName = this.generateRandomLetters();
    return this.http.get(`${this.apiUrl2}${randomName}`);
  }

  // Generar un nombre aleatorio con letras
  private generateRandomLetters(length: number = 5): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }  
}
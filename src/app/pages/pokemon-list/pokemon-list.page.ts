import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  libros: any[] = [];
  filteredlibros: any[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private pokemonService: PokemonService, private firestore: Firestore) {}

  ngOnInit() {
    this.fetchLibros();
  }

  fetchLibros() {
    this.loading = true;
    this.pokemonService.getlibros(10).subscribe({
      next: (response) => {
        this.libros = response.results.slice(0, 10);
        this.filteredlibros = this.libros;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching libros:', error);
        this.errorMessage = 'Hubo un error al cargar los libros.';
        this.loading = false;
      },
    });
  }

  sendToFirebase() {
    this.filteredlibros.forEach((libro, index) => {
      const robotImage = `https://robohash.org/${this.generateRandomLetters()}`;

      // Crear un objeto con título e imagen
      const data = {
        title: libro.title,
        image: robotImage,
      };

      // Guardar el objeto en Firestore
      const librosCollection = collection(this.firestore, 'libros');
      addDoc(librosCollection, data)
        .then(() => {
          console.log('Libro guardado:', data);
        })
        .catch((error) => {
          console.error('Error al guardar en Firebase:', error);
        });
    });
  }

  generateRandomLetters(length: number = 5): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

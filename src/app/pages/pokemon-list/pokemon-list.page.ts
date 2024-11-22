import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

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
  robotImage: string | null = null;

  constructor(private pokemonService: PokemonService) {}

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
        console.error('Error fetching Pokémon:', error);
        this.loading = false;
      },
    });
  }

  getRandomRobot() {
    this.loading = true;
    this.pokemonService.getImageRobots().subscribe({
      next: () => {
        const randomName = this.generateRandomLetters();
        this.robotImage = `${this.pokemonService['apiUrl2']}${randomName}`;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching robot image:', error);
        this.robotImage = null;
        this.loading = false;
      },
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
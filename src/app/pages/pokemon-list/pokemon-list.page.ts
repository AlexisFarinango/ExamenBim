import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  loading = false;
  errorMessage: string | null = null;
  selectedPokemon: any = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();
    
  }

  fetchPokemons() {
    this.loading = true;
    this.pokemonService.getPokemons(50).subscribe({
      next: (response) => {
        this.pokemons = response.results;
        this.filteredPokemons = this.pokemons;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.loading = false;
      },
    });
  }
  buscar() {
    const searchTerm = (document.getElementById('buscarpoke') as HTMLInputElement).value.trim().toLowerCase();
    if(!searchTerm){
      this.errorMessage = "Por favor ingresa un nombre valido"
      return;
    }
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
    this.pokemonService.getPokemonDetails(searchTerm).subscribe({
      next:(response)=>{
        this.selectedPokemon = response;
        this.loading = false;
      },
      error:(error)=>{
        console.error("Error al realizar consulta con detalles: ",error);
        this.errorMessage = "No se encontro el pokemon.";
        this.selectedPokemon = null;
        this.loading = false;
      }
    })
  }
}
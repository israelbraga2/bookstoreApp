import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';


@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  id_cat: String  = ''
  livro : Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''

  }

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  constructor(private service: LivroService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById()
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta)=> {
      this.livro = resposta
    })
  }
  update():void {
    this.service.update(this.livro).subscribe({
      next: resposta => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Livro atualizado com sucesso!')
      },
      error: err => {
       this.router.navigate([`categorias/${this.id_cat}/livros`]);
       this.service.mensagem("OPS! Falha ao atualizar o livro, Tente novamente!");
      }
    });
  }
  getMessageTitulo() {
    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 caracteres";
    }
    return false;
  }

  getMessageAutor(){
    if(this.nome_autor.invalid){
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres";
    }
    return false;
  }

  getMessageTexto(){
    if(this.texto.invalid){
      return "O campo TEXTO deve conter entre 10 e 2.000.000 catacteres";
    }
    return false;
  }

  verificaCamposPreenchidos(){
    if(this.getMessageTexto() || this.getMessageTitulo() || this.getMessageAutor()){
      return true;
    }
    return false;
  }

}
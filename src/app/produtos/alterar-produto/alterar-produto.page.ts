import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.page.html',
  styleUrls: ['./alterar-produto.page.scss'],
})
export class AlterarProdutoPage implements OnInit {

  // Intância uma classe para o Produto
  produto: Produto = new Produto();

  constructor(
    private prodService: ProdutoService, // Instancia o serviço do produto na variável prodService
    private route: Router, // Instancia o gerenciador de rotas
    private rotaAtiva: ActivatedRoute // Instancia o gerenciador de rotas ativas
  ) {
    // Pega o ID que veio pela rota e salva dentro da propriedade id do produto
    this.produto.id = this.rotaAtiva.snapshot.params['id'];
  }

  ngOnInit() {
    // Busca os dados do produto com o ID que veio pela rota
    this.prodService.buscarPorId(this.produto.id!).subscribe((dados:any) => {
      this.produto.nome = dados['nome'];
      this.produto.valor = dados['valor'];
    });
  }

  // Método que envia os dados do produto para alterar
  salvar() {
    // Envia os dados do produto para serem alterados
    this.prodService.alterar(this.produto);
    // Volta para a página home.
    this.route.navigateByUrl('/');
  }

}

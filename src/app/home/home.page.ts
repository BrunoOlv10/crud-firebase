import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/Produto';
import { AlertController } from '@ionic/angular';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

// Variável que armazena a lista de produtos que será exibida
public listaProdutos: Produto[] = [];

// Instancia o serviço do produto na variável prodService
constructor(private prodService: ProdutoService,
            private alertController: AlertController) { }

ngOnInit() {
  this.buscarProdutos();  // Chama o método que busca todos os produtos no Firbase
}

// Método para buscar todos os produtos no Firebase.
buscarProdutos() {
  // Chama o método de buscar produtos no Firebase e se sobrescreve para receber o retorno
  // O retorno (registros) é armazenado na variavel dadosRetorno
  this.prodService.buscarProdutos().subscribe(dadosRetorno => {
    // Percorre todos os registros que vieram no retorno e mapeia para a lista de produtos.
    this.listaProdutos = dadosRetorno.map((registro: DocumentChangeAction<any>) => (
      {
        id: registro.payload.doc.id, // Pega o ID do Registro no Firebase
        nome: registro.payload.doc.data()['nome'], // Pega o nome do Produto
        valor: registro.payload.doc.data()['valor'] // Pega o valor do Produto
        // ...registro.payload.doc.data() // Pega todos os valores do documento
      }
    )); // Fim do map
  }); // Fim do subscribe

}
// Método para deletar registros no Firebase após confirmação
async deletarProduto(id: string) {
  const alert = await this.alertController.create({
    header: 'Confirma exclusão deste produto?',
    buttons: [
      {
        text: 'Não',
        role: 'cancel',
        handler: () => {

        },
      },
      {
        text: 'Sim',
        role: 'confirm',
        handler: () => {
          this.prodService.deletar(id); // Chama o serviço e deleta o registro no Firebase
        },
      },
    ],
  });
  await alert.present();
  this.buscarProdutos(); // Recarrega a lista de Produtos
}
}

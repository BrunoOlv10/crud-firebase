import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  novo_produto: Produto = {
    nome: '',
    valor: 0
  }

  constructor(
    private prodService: ProdutoService, 
    private router: Router,
    private alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async cadastrarProduto() {
    if(this.novo_produto.nome === '' || this.novo_produto.valor === 0 ) {
      const alert = await this.alertController.create({
        header: "Ocorreu um erro...",
        message: "Preencha todos os campos corretamente antes de enviar",
        buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            }
        ]
      })
      await alert.present();
      return;
    }

    this.prodService.salvar(this.novo_produto)
    .then(() => {
      this.router.navigateByUrl('/home');
    })
    .catch(async () => {
      const alert = await this.alertController.create({
        header: "Ocorreu um erro...",
        message: "Não foi possível cadastrar o produto, tente novamente.",
        buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            }
        ]
      })
      await alert.present();
    })
  }

}

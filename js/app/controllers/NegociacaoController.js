class NegociacaoController {

    constructor(){

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'apaga', 'ordena', 'inverteOrdem');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        this._ordemAtual = '';
    }

    adicionaNegociacaoNaTabela(event){

        event.preventDefault();
      
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();
    }

    importaNegociacoes(){

        let service = new NegociacaoService();

        service.obterNegociacoes()
        .then(negociacoes => {
            
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso!';
        })
        .catch(erro => this._mensagem.texto = erro);
    }

    apagaNegociacoesDaTabela(event){

        event.preventDefault();

        this._listaNegociacoes.apaga();
        this._mensagem.texto = 'Negociacoes apagadas com sucesso!';
        this._limpaFormulario();
    }

    ordena(coluna){

        if(this._ordemAtual == coluna){

            this._listaNegociacoes.inverteOrdem();
        } else {

            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        
        this._ordemAtual = coluna;
    }

    _criaNegociacao(){

        return new Negociacao(DateHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value, 
            this._inputValor.value);
    }

    _limpaFormulario(){

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }
}
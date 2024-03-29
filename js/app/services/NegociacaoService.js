class NegociacaoService {

    constructor(){

        this._http = new HttpService();
    }

    obterNegociacoes(){

        return Promise.all([
            this._obterNegociacoesDaSemana(),
            this._obterNegociacoesDaSemanaAnterior(),
            this._obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });
    }

    _obterNegociacoesDaSemana(){

        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {

                return negociacoes.map(campo => new Negociacao(campo.data, campo.quantidade, campo.valor));
            })
            .catch(erro => {

                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana!');
            });                
    }

    _obterNegociacoesDaSemanaAnterior(){

        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {

                return negociacoes.map(campo => new Negociacao(campo.data, campo.quantidade, campo.valor));
            })
            .catch(erro => {

                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior!');
            });                
    }

    _obterNegociacoesDaSemanaRetrasada(){

        return this._http
                .get('negociacoes/retrasada')
            .then(negociacoes => {

                return negociacoes.map(campo => new Negociacao(campo.data, campo.quantidade, campo.valor));
            })
            .catch(erro => {

                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada!');
            }); 
    }              
}
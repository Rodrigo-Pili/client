class NegociacoesView extends View{

    template(modelo){

        return `
        <table id="tabela" class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${modelo.negociacoes.map(negociacao => `

                    <tr>
                        <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                    </tr>

                `).join('')}
            </tbody>
                <td colspan="3">Total Volume</td>
                <td>${modelo.volumeTotal}</td>
            <tfoot>
            </tfoot>
        </table>
        `;
    }
}
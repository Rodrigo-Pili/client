class NegociacoesView extends View{

    template(modelo){

        return `
        <table id="tabela" class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
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
                <td>${modelo.negociacoes.reduce((total, negociacao) => total += negociacao.volume, 0.0)}</td>
            <tfoot>
            </tfoot>
        </table>
        `;
    }
}
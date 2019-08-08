class DateHelper {

    constructor(){

        throw new Error('DateHelper não pode ser instaciada! - no new-');
    }

    static dataParaTexto(data){

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textoParaData(texto){

        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('A data deve estar no formato yyyy-mm-dd');

        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }   
}
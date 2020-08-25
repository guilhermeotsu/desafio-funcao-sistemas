$(document).ready(function () {
    const numberPattern = /\d+/g;

    if (typeof obj !== 'undefined' && obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

    $("#CPF").mask('000.000.000-00', { reverse: true });
    $("#CEP").mask('00000-000');
    $("#Telefone").mask('(00) 00000-0000')

    let ufs = [];
    let uf = $("#formCadastro").find("#Estado").val();

    $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados', { format: 'json' })
        .done(function (response) {
            ufs = response;
        })

    $("#CEP").on('input', function () {
        const TAMANHO_CEP = 8;
        const value = this.value.match(numberPattern).join('');
        const $inputs = $("#formCadastro input[disabled], #Logradouro")

        if (value.length === TAMANHO_CEP) {
            const url = "https://viacep.com.br/ws/" + value + "/json/unicode/"

            $.getJSON(url, { format: 'json' })
                .done((response) => {
                    if (response.erro) {
                        this.style.border = '1px solid red';
                        return;
                    }

                    this.style.border = '1px solid #cccccc';

                    $.each($inputs, function (i, el) {
                        const tagName = el.getAttribute("name");

                        switch (tagName) {
                            case 'Estado': {
                                const { nome } = ufs.filter(item => item.sigla === response.uf)[0]
                                el.value = nome;

                                uf = response.uf
                                break;
                            }
                            case 'Cidade': {
                                el.value = response.localidade;
                                break;
                            }
                            case 'Logradouro': {
                                el.value = response.logradouro;
                                break;
                            }
                        }
                    })
                })

        } else {
            $.each($inputs, function (i, el) {
                el.value = "";
            })
        }
    })

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        if ($(this).find("#CPF").val().length < 11) {
            ModalDialog("CPF inválido", "CPF deve ter 11 caracteres!");
            return;
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val().match(numberPattern).join(''),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": uf,
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val().match(numberPattern).join(''),
                "CPF": $(this).find("#CPF").val().match(numberPattern).join('')
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();

                    if (urlRetorno !== null) {
                        setTimeout(function () {
                            window.location.href = urlRetorno;
                        }, 1500)
                    }
                }
        });
    })
})


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
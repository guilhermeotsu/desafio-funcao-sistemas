
$(document).ready(function () {

    if (document.getElementById("gridClientes"))
        $('#gridClientes').jtable({
            title: 'Clientes',
            paging: true, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: urlClienteList,
            },
            fields: {
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                Email: {
                    title: 'Email',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    listClass: 'table-grid-options',
                    display: function (data) {
                        return `<button onclick="window.location.href=\'${urlAlteracao}/${data.record.Id}\'" class="btn btn-primary btn-sm">Alterar</button>
                                <button type="button" data-toggle="modal" data-target="#deleteModal" data-id="${data.record.Id}" class="btn btn-secondary btn-sm btn-danger">Excluir</button`;
                    }
                }
            }
        });

    //Load student list from server
    if (document.getElementById("gridClientes"))
        $('#gridClientes').jtable('load');

    let clienteId;

    $("#deleteModal").on('show.bs.modal', function (e) {
        clienteId = $(e.relatedTarget).data('id');
    })

    $("#modal-delete").click(() => {
        $.post(urlExcluir, { id: clienteId }, function (response) {
            alert('Cliente excluído com sucesso!');
            location.reload();
        })
            .fail((error) => {
                alert('Falha ao excluir o cliente!');
            });
    })
})
var idioma=

            {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Show _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "NingÃºn dato disponible en esta tabla",
                "sInfo":           "",
                "sInfoEmpty":      "",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Search:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Ãšltimo",
                    "sNext":     "Next",
                    "sPrevious": "Prev"
                },
                "oAria": {
                    "sShowAscending":  ":",
                    "sShowDescending": ": "
                },
                "buttons": {
                    "copyTitle": 'Informacion copiada',
                    "copyKeys": 'Use your keyboard or menu to select the copy command',
                    "copySuccess": {
                        "_": '%d filas copiadas al portapapeles',
                        "1": '1 fila copiada al portapapeles'
                    },

                    "pageLength": {
                    "_": "Show",
                    "-1": "Show Todo"
                    }
                }
            };

$(document).ready(function() {
  
  
  var table = $('#ejemplo').DataTable( {
    
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": true,
    "language": idioma,
    "lengthMenu": [[5,10,20, -1],[5,10,50,"Show Todo"]],
    dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',
    
    
    buttons: {
          dom: {
            container:{
              tag:'div',
              className:'flexcontent'
            },
            buttonLiner: {
              tag: null
            }
          },
          
          
          
          
          buttons: [


                    
                   

                  
                   
                   
                    {
                        extend:    'pageLength',
                        titleAttr: 'Registros a Show',
                        className: 'selectTable'
                    }
                ]
          
          
        }
    
    
    
    
    
    
    
    
    
    
          
        
    
        
    });

  
} );
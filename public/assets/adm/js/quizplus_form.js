
$(function () {



function load_datatable_classes($table, identifier, usersettings) {

    jQuery.extend( jQuery.fn.dataTableExt.oSort, {
        "date-uk-pre": function ( a ) {
            if (a == null || a == "") {
                return 0;
            }
            var ukDatea = a.split('/');
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },

        "date-uk-asc": function ( a, b ) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-uk-desc": function ( a, b ) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    } );


    var columns_data = [],
        th_total = $table.find('thead tr th').length;

    $table.find('thead tr th').each(function (i, column) {
        var column_id = i,
            $column = $(column),
            title = $column.text(),
            data = {"data": $(column).data('id')};

        $column.data('column-id', column_id);

        if (usersettings[identifier.colvis]) {
            data.visible = usersettings[identifier.colvis][column_id] == 'true';
        }

        if (usersettings[identifier.colwidth]) {
            if (usersettings[identifier.colwidth][column_id]) {
                data.width = usersettings[identifier.colwidth][column_id];
            }
        }

        if ($column.attr('width') != undefined) {
            data.width = $column.attr('width');
            $column.html('<span class="fix-width">' + title + '</span>');
            $column.find('span.fix-width').width(data.width);
        }

        columns_data.push(data);

    });

    var table = $table.DataTable({
        responsive: true,
        "autoWidth": false,
        "lengthMenu": [[10, 25, 50, 100, 500, 1000, -1], [10, 25, 50, 100, 500, 1000, "Todos"]],
        "sDom": 'C<"clear">RZlfrtip',
        "oColVis": {
            "aiExclude": [0, th_total - 1],
            "fnStateChange": function () {
                var data = [];

                $.each(table.columns()[0], function (i) {
                    data[$(table.column(i).header()).data('column-id')] = table.column(i).visible();
                });

                $.post('./ws/usersettings/save', {
                    identifier: identifier.colvis,
                    data: data
                });
            }
        },
        columnDefs: [
            { type: 'date-uk', targets: 7 }
        ],
        "colResize": {
            // "exclude": [0, th_total - 1],
            "handleWidth": 5,
            "resizeCallback": function () {
                var data = [];

                $.each(table.columns()[0], function (i) {
                    var $column = $(table.column(i).header()),
                        width = $column.is(':visible') ? $column.width() : 10;

                    data[$column.data('column-id')] = width;
                });

                $.post('./ws/usersettings/save', {
                    identifier: identifier.colwidth,
                    data: data
                });
            }
        },
        "language": {
            "url": "assets/dataTables/plugins/i18n/Portuguese-Brasil.lang"
        },
        "columns": columns_data,
        "columnDefs": [{
            "targets": [0, th_total - 1],
            "orderable": false
        }],
        "initComplete": function () {
            $(".page_loading").hide(0, function () {
                $table.removeClass('invisible');
            });
        }
    }).order([1, "desc"]);

    // Reorder
    new $.fn.dataTable.ColReorder(table, {
        fnReorderCallback: function () {
            var data = [];

            $('thead tr th', $table).each(function (i, el) {
                if ($(el).data('column-id') != th_total - 1) {
                    data[i] = $(el).data('column-id');
                }
            });

            $.each(table.columns()[0], function (i) {
                if ($.inArray(i, data) == -1 && i != th_total - 1) {
                    data.push(i);
                }
            });

            data.push(table.columns()[0].length - 1);

            $.post('./ws/usersettings/save', {
                identifier: identifier.reorder,
                data: data
            });
        },
        iFixedColumnsLeft: 1,
        iFixedColumnsRight: 1,
        aiOrder: usersettings[identifier.reorder]
    });
}

function load_table_classes() {
    var $table = $("table#table-quiz"),
        identifier = {
            reorder: "reorder-table-quiz",
            colvis: "colvis-table-quiz",
            colwidth: "colwidth-table-quiz"
        };

    var usersettings = [];
    load_datatable_classes($table, identifier, usersettings);
}



        load_table_classes();



});


function update_class(quiz_id, class_id){


    // $("#post-statistic-modal").modal('show');

    // $("#post-statistic-modal .modal-body .load").fadeOut(1000);

    $.get('http://dev.localhost/blog/public/crudintro/modal', '', function (data) {
        if (data.error) {

            alert_box(data);

            return false;
        } else {

            
            $("#post-statistic-modal").modal('show');

            $("#post-statistic-modal .modal-body .load").fadeOut(1000);


            $('#content-modal').html(data);


        }
    });
}


// $(function () {
//     var url = extract_url(1);
//     var url_action = extract_url(2);
//     var url_sub = extract_url(3);
//     var quiz_id = $.isNumeric(extract_url('last')) ? {id: extract_url('last'), adm: true} : null ;

//     $( "#quiz-content" ).data( "var", $("#quiz-content") );
//     $( "#quiz-content" ).data( "blank_id", 0 );
//     $( "#quiz-content" ).data( "blank_id_answer", 0 );

//     console.info('url:'+url+ " action:"+url_action+" url_sub:"+url_sub + " quiz_id" + quiz_id);

//     $("#quiz-content").find("li .input-group input").keypress(function (e) {
//         if (e.keyCode == 13) {
//             // $file_list.find("li .input-group .btn.help").click();
//             return false;
//         }
//     });


//     clicks_gerais();


//     if((url == "quiz-plus" || url == "quizplus") && (url_action == "create" || url_action == "update"))
//     {
//         var quiz_default = {
//                 quiz_title: "Criar novo",
//                 text_submit: "Enviar",
//                 action: 'learn/learn/create',
//                 use_data_return: 'id',
//                 id: 0,
//                 title: ""
//             };

//         quiz_default.quiz_title = "Criar quiz plus";
//         quiz_default.description = "";
//         quiz_default.meta = "";

//         if(url_action == "create") {

//             quiz_default.status_active_1 = "active";
//             quiz_default.status_checked_1 = "checked=checked";

//             insert_data(quiz_default, $("#quiz-content"));

//             var $quiz_content = $("#quiz-content");

//             $quiz_content.find('form').submit(function (e) {

//                 e.preventDefault(e);

//                 var data_formB = $(this).serialize();

//                 if($("#new-category-text").val().length > 0){

//                     $.post('learn/quiz/type/create', $(this).serialize(), function (data) {
//                         if (data.error) {
//                             alert_box(data);
//                         } else {

//                             console.info('retorno')

//                             $("#new-category-id").val(data.id);

//                             data_formB = data_formB + '&new_learntype_id=' + data.id ;

//                             quiz_default.msg = "Quiz Plus salvo, você pode voltar a editar drops e turmas posteriormente";

//                             $.post('learn/learn/create', data_formB, function (data_post) {
//                                 if (data_post.error) {
//                                     alert_box(data_post);
//                                 } else {

//                                     localMsg(quiz_default);


//                                     // throw new Error('--b');
//                                     window.location = 'adm/quiz-plus/' + data_post.id + '/drops';
//                                 }
//                             });
//                         }
//                     });

//                 } else {

//                     quiz_default.msg = "Quiz Plus salvo, você pode voltar a editar drops e turmas posteriormente";
//                     var data_form = $(this).serialize();

//                     $.post('learn/learn/create', data_form, function (data_post) {
//                         if (data_post.error) {
//                             alert_box(data_post);
//                         } else {

//                             localMsg(quiz_default);

//                             // throw new Error('--be');
//                             window.location = 'adm/quiz-plus/' + data_post.id + '/drops';
//                         }
//                     });
//                 }
//                 return false;

//             });

//             $.get('learn/quiz/type/', '', function (learntype) {
//                 if (learntype.error) {
//                     alert_box(learntype);
//                     return false;
//                 } else {
//                     var listitems;

//                     for (a in learntype.quiztype) {

//                         listitems += '<option value=' + learntype.quiztype[a].id + '>' + learntype.quiztype[a].title + '</option>';

//                     }
//                     $("#input-learntype_id").append(listitems);

//                     add_click_new_category(listitems);
//                 }
//             });



//         } else if (url_action == "update") {
//             page_loading("show");
//             var quizid = url_sub;
//             if ($.isNumeric(quizid))
//             {
//                 $.post('learn/quiz/'+quizid, quizid, function (data) {
//                     if (data.error) {

//                         alert_box(data);
//                         return false;
//                     } else {


//                         var quiz_default = {
//                             quiz_title: "Alterar Descrição",
//                             text_submit: "Enviar",
//                             action: 'learn/learn/update',
//                             use_data_return: 'id',
//                             id: 0,
//                             title: ""
//                         };

//                         if(data.Quiz[0].status = 1)
//                         {
//                             quiz_default.status_active_1 = 'active' ;
//                             quiz_default.status_checked_1 = 'checked=checked' ;
//                         } else
//                         {
//                             quiz_default.status_active_0 = 'active' ;
//                             quiz_default.status_checked_0 = 'checked=checked' ;
//                         }


//                         $.get('learn/quiz/type/', '', function (learntype) {
//                             if (learntype.error) {


//                                 alert_box(learntype);
//                                 return false;
//                             } else {

//                                 var listitems;

//                                 for(a in learntype.quiztype){

//                                     listitems += "<option value=\"" + learntype.quiztype[a].id + "\"  " +
//                                                  ((data.Quiz[0].learntype_id == learntype.quiztype[a].id) ? "selected=selected" : "") + ">" +
//                                                 learntype.quiztype[a].title +
//                                                 "</option>";
//                                 }

//                                 $("#input-learntype_id").append(listitems);

//                                 quiz_default.title = data.Quiz[0].title;
//                                 quiz_default.description = data.Quiz[0].description;
//                                 quiz_default.meta = data.Quiz[0].meta;
//                                 // quiz_default.meta = data.Quiz[0].meta;


//                                 insert_data(quiz_default, $("#quiz-content"));

//                                 // $("#a_visaousuario").click(function () {
//                                 //     $(".content_all").hide();
//                                 //     $("#visao_usuario").slideDown();
//                                 //     $("#visao_analitica").hide();
//                                 // });
//                                 //
//                                 // $("#a_visaoanalitica").click(function () {
//                                 //     $(".content_all").hide();
//                                 //     $("#visao_analitica").slideDown();
//                                 //     $("#visao_usuario").hide();
//                                 // });

//                                 add_click_new_category(learntype.quiztype);

//                                 var $quiz_content = $("#quiz-content");

//                                 $quiz_content.find('form').submit(function (e) {

//                                     e.preventDefault(e);

//                                     var data_form = $(this).serialize();

//                                     if($("#new-category-text").val().length > 0)
//                                     {

//                                         console.info('mai que 0');

//                                         $.post('learn/quiz/type/create', $(this).serialize(), function (data) {
//                                             if (data.error) {
//                                                 alert_box(data);
//                                             } else {

//                                                 console.info('retorno')

//                                                 $("#new-category-id").val(data.id);

//                                                 data_form = data_form + '&new_learntype_id=' + data.id ;

//                                                 quiz_default.msg = "Quiz Plus salvo, você pode voltar a editar drops e turmas posteriormente";

//                                                 $.post('learn/learn/update/' + quizid , data_form, function (data_post) {
//                                                     if (data_post.error) {
//                                                         alert_box(data_post);
//                                                     } else {

//                                                         localMsg(quiz_default);

//                                                         // throw new Error("ass");
//                                                         window.location = 'adm/quiz-plus/' + quizid + '/drops';
//                                                     }
//                                                 });
//                                             }
//                                         });

//                                     } else {

//                                         quiz_default.msg = "Quiz Plus salvo, você pode voltar a editar drops e turmas posteriormente";
//                                         var data_form = $(this).serialize();

//                                         $.post('learn/learn/update/' + quizid , data_form, function (data_post) {
//                                             if (data_post.error) {
//                                                 alert_box(data_post);
//                                             } else {

//                                                 localMsg(quiz_default);

//                                                 // throw new Error("e2rr");
//                                                 window.location = 'adm/quiz-plus/' + quizid + '/drops';
//                                             }
//                                         });
//                                     }


//                                     return false;


//                                 });
//                             }
//                         });
//                     }
//                 });
//             }
//         }



//     } else if (url_sub=="drops")
//     {

//         var quiz_id = extract_url(2);

//         var $quiz_content = $("#quiz-content");

//         $.get('/learn/quiz/' + quiz_id + '/drops', function (data_drops) {
//             if (data_drops.error) {
//                 alert_box(data_drops);
//             } else {

//                 $( "#sortable" ).sortable({
//                     update: function( event, ui ) {

//                         var quiz_id = extract_url(2);

//                         var i = 0;
//                         orderdrops = {};
//                         $("#sortable li").each(function(n) {
//                             i++;
//                             orderdrops[i] = $(this).val();
//                         });

//                         orderdrops["learn_id"] = quiz_id ;

//                         $.post('learn/drop/reorder', orderdrops, function (data_post) {
//                             if (data_post.error) {
//                                 alert_box(data_post);
//                             } else {

//                                 console.info('dsfa');
//                                 alertMsgFadeOut('"Drops reordenados com sucesso"', 5);

//                                 $.get('/adm/quiz-plus/' + quiz_id + '/visualization', function (data_html) {
//                                     if (data_html.error) {
//                                         alert_box(data_classes);
//                                     } else {
//                                         //console.info(data_html);
//                                         var visao_analitica = $(data_html).find("#visao_analitica");
//                                         var visao_usuario = $(data_html).find("#visao_usuario");

//                                         $("#visao_analitica").html(visao_analitica);
//                                         $("#visao_usuario").html(visao_usuario);

//                                     }
//                                 });

//                                 // window.location = 'adm/quiz-plus/' + quiz_id  + '/visualization';
//                             }
//                         });
//                     }

//                 });

//                 if (Object.keys(data_drops.Learn).length > 0) {
//                     $(".headerdrops").removeClass("hide");

//                     for (i in data_drops.Learn) {
//                         $('#sortable').append("<li value=\"" + data_drops.Learn[i].id + "\" class=\"ui-state-default lisortable\"><span class=\"ui-icon drag ui-icon-arrowthick-2-n-s\"></span><div class='sortname " + (data_drops.Learn[i].name.length > 49  ? "nopad" : "") +"\'>" + data_drops.Learn[i].name + "</div>" +
//                         "<div >" + (data_drops.Learn[i].contents.length > 0 ? data_drops.Learn[i].contents[0].type[0].name : "&nbsp;" ) + "</div>" +
//                         "<div >" + (data_drops.Learn[i].required == 1 ? "<span class='fa fa-check'>&nbsp;</span>" : "&nbsp;" ) + "</div>" +
//                         "<div >" + (data_drops.Learn[i].questions.length > 0 ? data_drops.Learn[i].questions.length : "&nbsp; " ) + "</div>" +
//                         "<div >" + (data_drops.Learn[i].total_points_questions > 0 ? data_drops.Learn[i].total_points_questions : "&nbsp;" ) + "</div>" +
//                         "<div class=\"actionsort smallpad btn-group\"><a title=\"Alterar Drop\" onclick=\"update_drop(" + quiz_id + ", " + data_drops.Learn[i].id + ")\" class=\"btn btn-default\"> " +  "<i class=\"fa fa-edit\"></i></a>" +
//                         "<a class=\"delete btn btn-danger\" title=\"Deletar Drop\" onclick=\"modal_confirm('Confirmar exclusão do drop?','', 'delete_drop(" + data_drops.Learn[i].id + ")'); return false;\"><i class=\"fa fa-trash-o\"></i></a></div></li>");
//                     }

//                 }

//             }
//         });



//     } else if (url_sub=="visualization") {

//         var quiz_id = extract_url(2);

//         quiz_default = {
//             quiz_title: "Visualização",
//             text_submit: "Prosseguir",
//             learn_id: quiz_id,
//             description: '',
//             msg: "Salvo com sucesso",
//             use_data_return: 'learn_id',
//         };

//         $("#quiz-content").data('quiz-default', quiz_default);

//         $quiz_content = insert_data(quiz_default, $("#quiz-content"));

//     } else if (url_sub=="classes") {

//         var quiz_id = extract_url(2);

//         load_table_classes();

//     }

// });

// function duplicate_class(quiz_id,class_id){

//     $("#post-statistic-modal-duplicate").modal('show');

//     $("#post-statistic-modal-duplicate .modal-body .load").fadeOut(1000);

//     $quiz_content = $("#class-duplicate");

//     $quiz_content.find('form').submit(function (e) {

//         e.preventDefault(e);

//         page_loading("show");

//         var form = $(this);

//         var data_form = $(this).serialize();

//         $.post('learn/quiz/class/' + class_id + '/duplicate/', data_form, function (drop) {
//             if (drop.errors) {
//                 alert_box(drop.errors);
//             } else {

//                     var quiz_default = {};
//                     quiz_default.msg = "Turma duplicada com sucesso";
//                     localMsg(quiz_default);

//                     window.location.reload();

//             }
//         });
//         return false;
//     });
// }


// function add_click_new_category(learntype){
//     console.info("sssaa");
//     // $form.find("#quiz-content").val(helpcategory_id).change();
//     var $form = $("#quiz-content");
//     $("#quiz-content").find('#new-category').click(function () {
//         console.info('dddaaa');

//         $form.find(".table_learntype").addClass('hide');

//         $("#input-learntype_id", $form).addClass('hide').find("#input-learntype_id").attr('disabled', 'disabled');
//         $(".new-category", $form).removeClass('hide').find("#new-category-text, #new-category-id").removeAttr('disabled');

//         $("#new-category-text", $form).focus();
//     });

//     $form.find("#new-category-cancel").click(function () {

//         $form.find(".table_learntype").removeClass('hide');

//         $("#input-learntype_id", $form).removeClass('hide').find("#input-learntype_id").removeAttr('disabled');
//         $("#new-category-text").val("");
//         $(".new-category", $form).addClass('hide').find("#new-category-text, #new-category-id").attr('disabled', 'disabled');

//         $("#help-modal-category", $form).focus();
//     });

//     if (!learntype.length) {
//         $form.find('#new-category').click();
//         $form.addClass('add-category');
//     }
// }


// function add_drop(learn_id)
// {
//     quiz_default = {
//         title_drop: "",
//         description: "",
//         msg: "Drop salvo",
//         question_weight: "",
//         answer_title: "",
//         drop_title: "Adicionar Drop",
//         text_submit: "Salvar",
//         order: 1,
//         id: 0,
//         title: "",
//         content: "",
//         quiz_not_found: false,
//         quiz_not_found_class: '',
//         learn_id: learn_id,
//         description: "",
//         title_drop: "",
//         warning_upload: "",
//         avaliation_required_checked_0: "checked=checked",
//         avaliation_required_0: "active",
//         question_title: '',
//         msg: "Drop salvo",
//         question: [{
//             id: 1,
//             title: "",
//             weight: "",
//             new: true,
//             answer: [{
//                 id: 1,
//                 title: "",
//                 weight: -1,
//                 new: true
//             }]
//         }]
//     };

//     $("#quiz-content").data('quiz-default', quiz_default);

//     $quiz_content = insert_data(quiz_default, $("#quiz-content"));

//     click_submit_files();

//     get_template($('#container-question'), 'template-question');

//     var question = {
//         question_id: "1",
//         new_question: "1",
//         question_title: "",
//         question_weight: "",
//         class_new_question: true
//     };

//     insert_select_posts(null);

//     insert_select_help(null);

//     $quiz_content.find('.question-delete').click(function () {
//         var $box_question = $(this).closest('.box-question');

//         $box_question.fadeOut(function () {
//             $box_question.remove();
//         })
//     });

//     $("#post-statistic-modal").modal('show');

//     $("#post-statistic-modal .modal-body .load").fadeOut(1000);

//     answer_radio_change_checked();

//     $quiz_content.find('#add-content').click(function () {
//             toggle_add_content_button(this);
//     });

//     $quiz_content.find('#add-questiondiv').click(function () {
//             toggle_add_avaliation_button(this,$quiz_content)

//     });

//     $('.required').change(function() {
//         $('.req span').removeClass("glyphicon-ok")
//         if(this.value == 0) {
//             $(".perg").removeAttr('required');
//             $('.req span:not(:first)').addClass("glyphicon-ok")

//         } else {
//             $(".perg:first").prop('required',true);
//             $('.req span:first').addClass("glyphicon-ok")
//         };
//     });


//     $quiz_content.find('form').submit(function (e) {

//         console.info('ddd');
//         page_loading("show");

//         var form = $(this);

//         var data_form = $(this).serialize();

//         $.post('learn/drop/create', data_form, function (drop) {
//             if (drop.errors) {
//                 alert_box(drop.errors);
//             } else {

//                 if(drop.id) {

//                     localMsg(quiz_default);

//                     data_form = data_form + '&learndrop_id=' + drop.id ;
//                     data_form = data_form + '&order=1';

//                     if($quiz_content.find("#delete_all_question").val() == 0){

//                         $.post("learn/question/create_multiple", data_form, function (data_post) {
//                             if (data_post.error) {
//                                 alert_box(data_post);
//                             } else {
//                                 localMsg(quiz_default);

//                                 // console.info('passou create multilple');
//                                 window.location = 'adm/quiz-plus/' + learn_id  + '/drops';
//                             }
//                         });
//                     }


//                     if($quiz_content.find("#delete_all_content").val() == 0){

//                         $('#content_'+$('input[name=learncontenttype_id]:checked').val()).attr('name', 'content');
//                         $('#content_'+$('input[name=learncontenttype_id]:checked').val()).attr('id', 'content');

//                         var formData = new FormData($("#drop_form")[0]);
//                         formData.append( 'learndrop_id', drop.id );

//                         $.ajax({
//                             url: "learn/content/create",
//                             type: 'POST',
//                             data: formData,
//                             mimeType: "multipart/form-data",
//                             contentType: false,
//                             cache: false,
//                             processData: false,
//                             success: function (data, textStatus, jqXHR) {
//                                 // debugger;

//                                 // page_loading();
//                                 window.location = 'adm/quiz-plus/' + learn_id  + '/drops';
//                                 // throw new Error('succc');

//                             },
//                             error: function (jqXHR, textStatus, errorThrown) {
//                                 page_loading();
//                                 console.info("errrror");
//                                 // throw new Error('error');


//                             }
//                         });
//                     }

//                     window.location = 'adm/quiz-plus/' + learn_id  + '/drops';


//                 } else {
//                     quiz_default.msg = "Erro ao criar";
//                     localMsg(quiz_default);
//                 }
//             }
//         });
//         return false;
//     });

// }

// function toggle_add_content_button($this){

//     $('.contenttyperadio').change(function() {
//         $(".ct").addClass('hide');
//         $("#contenttyperadio_" + this.value).removeClass('hide');

//     });

//     if ($($this).hasClass("btn-warning")) {
//         $(".conteudo_t").slideDown( "slow" );
//         $($this).removeClass("btn-warning");
//         $($this).addClass("btn-danger");
//         $($this).html("Excluir conteúdo");
//         $("#delete_all_content").val(0);

//     } else {
//         $($this).removeClass("btn-danger");
//         $($this).addClass("btn-warning");
//         $($this).html("Adicionar conteúdo");
//         $(".conteudo_t").slideUp( "slow" );
//         $("#delete_all_content").val(1);

//     }
// }

// function toggle_add_avaliation_button($this,$quiz_content){

//     if ($($this).hasClass("btn-warning")) {
//         console.info('tessssm');
//         $(".avaliacao").slideDown( "slow" );
//         $($this).removeClass("btn-warning");
//         $($this).addClass("btn-danger");
//         $($this).html("Excluir avaliação");
//         $("#delete_all_question").val(0);
//         insert_questions_blank($quiz_content, "" , true);

//     } else {
//         console.info('ntem');
//         $($this).removeClass("btn-danger");
//         $($this).addClass("btn-warning");
//         $($this).html("Adicionar avaliacao");
//         $(".avaliacao").slideUp( "slow" );
//         $("#delete_all_question").val(1);
//         $('.box-question').remove();


//     }
// }

// function update_drop(quiz_id, drop_id)
// {
//         $quiz_content = $( "#quiz-content" ).data( "var" );

//         $.post('learn/quiz/'+quiz_id+'/drops/'+drop_id, '', function (data) {
//             if (data.error) {

//                 alert_box(data);
//                 return false;
//             } else {

//                 var quiz_default = {
//                     text_submit: "Salvar",
//                     description: data.Learn[0].description,
//                     title_drop: data.Learn[0].name,
//                     id: 0,
//                     order: 1,
//                     title: "",
//                     drop_title: "Alterar Drop",
//                     quiz_not_found: false,
//                     quiz_not_found_class: '',
//                     learn_id: quiz_id,
//                     warning_upload: "(caso já tenha um vídeo/arquivo para este drop, ele será substituído)",
//                     action: 'learn/drop/update',
//                     // action: 'adm/quizplus/drop_create',
//                     msg: "Drop salvo",
//                     use_data_return: 'learn_id',
//                     content: data.Learn[0].contents.length > 0 ? data.Learn[0].contents[0].content : ""
//                 };

//                 if(data.Learn[0].required == 1)
//                 {
//                     quiz_default.avaliation_required_1 = 'active' ;
//                     quiz_default.avaliation_required_checked_1 = 'checked=checked' ;
//                 } else
//                 {
//                     quiz_default.avaliation_required_0 = 'active' ;
//                     quiz_default.avaliation_required_checked_0 = 'checked=checked' ;
//                 }

//                 var dropcontent_id = null;

//                 quiz_default.finishin_class = '' ;
//                 quiz_default.finishin_checked = '' ;
//                 quiz_default.finishin_disabled = '' ;


//                 $("#learncontenttype_id").each(function(i)
//                 {
//                     this.checked = false;
//                 });


//                 $quiz_content = insert_data(quiz_default, $quiz_content);

//                 insert_questions($quiz_content, data.Learn[0].questions, true);

//                 insert_select_posts(null);

//                 click_submit_files();

//                 insert_select_help(null);

//                 if(data.Learn[0].contents.length > 0)
//                 {
//                     $(".conteudo_t").show();
//                     $("#add-content").removeClass("btn-warning");
//                     $("#add-content").addClass("btn-danger");
//                     $("#add-content").html("Excluir conteúdo");


//                     $('.contenttyperadio').change(function() {
//                         $(".ct").addClass('hide');
//                         $("#contenttyperadio_" +  + this.value).removeClass('hide');
//                         $("#content_" + this.value).html("");

//                     });

//                     $(".avaliacao").hide();
//                     $("input[name=learncontenttype_id][value=" + data.Learn[0].contents[0].learncontenttype_id + "]").attr('checked', 'checked');
//                     $(".c_radio_" + data.Learn[0].contents[0].learncontenttype_id + "").addClass('active');

//                     $("#contenttyperadio_" + data.Learn[0].contents[0].learncontenttype_id).removeClass('hide');

//                     dropcontent_id = data.Learn[0].contents[0].id;

//                     if(data.Learn[0].contents[0].learncontenttype_id == 1)
//                     {
//                         insert_select_posts(data.Learn[0].contents[0].content[0].id);
//                     }

//                     if(data.Learn[0].contents[0].learncontenttype_id == 2)
//                     {
//                         insert_select_help(data.Learn[0].contents[0].content[0].id);
//                     }

//                     if(data.Learn[0].contents[0].learncontenttype_id == 3)
//                     {
//                         $("#preview-video").removeClass("hide");

//                         if(data.Learn[0].contents[0].content == "" || data.Learn[0].contents[0].content == null){
//                             $("#preview-video").addClass("hide");
//                         }

//                         $(".delete-icon.vid, .abort-delete.vid").click(function () {
//                             if ($(this).hasClass('delete-icon')) {
//                                 $(".faixa.vid").show();
//                                 $("#delete_content").val(1);
//                             }
//                         });
//                     }

//                     if(data.Learn[0].contents[0].learncontenttype_id == 4){

//                         $("#preview-file").removeClass("hide");

//                         if(data.Learn[0].contents[0].content == "" || data.Learn[0].contents[0].content == null){
//                             $("#preview-file").addClass("hide");
//                         }

//                         var string_content = data.Learn[0].contents[0].content;

//                         var last_four = string_content.substr(string_content.length - 4);

//                         if(last_four == ".jpg" || last_four == ".gif" || last_four == ".png" || last_four == ".jpg"){

//                             $('#content_download').html('<img class="img_content" src="' + string_content + '">');
//                         } else if(string_content=="") {
//                             $('#content_download').html('');
//                         } else {
//                             $('#content_download').html('<a href="' + string_content + '" target="_blank" >arquivo' + last_four + '</a>');
//                         }

//                         // id.substr(id.length - 5);
//                         $(".delete-icon").click(function () {
//                             if ($(this).hasClass('delete-icon')) {
//                                 $(".delete-icon").hide();
//                                 $(".faixa_img").show();
//                                 $("#delete_file").val(1);
//                             }
//                         });
//                     }

//                 }

//                 $('.required').change(function() {
//                     $('.req span').removeClass("glyphicon-ok")
//                     if(this.value == 0) {
//                         $(".perg").removeAttr('required');
//                         $('.req span:not(:first)').addClass("glyphicon-ok")
//                     } else {
//                         $(".perg:first").prop('required',true);
//                         $('.req span:first').addClass("glyphicon-ok")
//                     }
//                 });


//                 // $('.contenttyperadio').change(function() {
//                 //     $("#contenttyperadio_" + this.value).removeClass('hide');
//                 //
//                 // });

//                 if(data.Learn[0].questions.length > 0){
//                     $(".avaliacao").show();
//                     $("#add-questiondiv").removeClass("btn-warning");
//                     $("#add-questiondiv").addClass("btn-danger");
//                     $("#add-questiondiv").html("Excluir avaliação");
//                 }

//                 if(data.Learn[0].questions.length > 0 && data.Learn[0].contents.length > 0) {
//                     $(".conteudo_t").show();
//                     $(".avaliacao").show();

//                     $("input[name=learncontenttype_id][value=" + data.Learn[0].contents[0].learncontenttype_id + "]").attr('checked', 'checked');
//                     $(".active_contenttype_" + data.Learn[0].contents[0].learncontenttype_id).addClass('active');

//                 }

//                 $quiz_content.find('#add-content').click(function () {
//                     toggle_add_content_button(this);
//                 });

//                 $quiz_content.find('#add-questiondiv').click(function () {

//                     get_template($('#container-question'), 'template-question');

//                     var question = {
//                         question_id: "1",
//                         new_question: "1",
//                         question_title: "",
//                         question_weight: "",
//                         class_new_question: true
//                     };

//                     // insert_questions_blank($quiz_content, "" , true);

//                     toggle_add_avaliation_button(this,$quiz_content)

//                 });

//                 check_icons();
//                 $("#post-statistic-modal").modal('show');
//                 $("#post-statistic-modal .modal-body .load").fadeOut(1000);

//                 $quiz_content.find('form').submit(function (e) {

//                     page_loading("show");

//                     e.preventDefault(e);

//                     var form = $(this);

//                     var data_form = $(this).serialize();
//                     data_form = data_form + '&learndrop_id=' + drop_id ;

//                     var formData = new FormData($("#drop_form")[0]);
//                     formData.append( 'learndrop_id', drop_id );

//                     $.ajax({
//                     url: 'learn/drop/update/'+drop_id,
//                     type: 'POST',
//                     data: formData,
//                     mimeType: "multipart/form-data",
//                     contentType: false,
//                     cache: false,
//                     processData: false,
//                         success: function (data, textStatus, jqXHR) {
//                             // debugger;

//                             localMsg(quiz_default);

//                             if (dropcontent_id != null && dropcontent_id > 0)
//                             {
//                                 $('#content_'+$('input[name=learncontenttype_id]:checked').val()).attr('name', 'content');
//                                 $('#content_'+$('input[name=learncontenttype_id]:checked').val()).attr('id', 'content');

//                                 var formD = new FormData($("#drop_form")[0]);
//                                 formD.append( 'learndrop_id', drop_id );

//                                 $.ajax({
//                                     url: "learn/content/update/" + dropcontent_id,
//                                     type: 'POST',
//                                     data: formD,
//                                     mimeType: "multipart/form-data",
//                                     contentType: false,
//                                     cache: false,
//                                     processData: false,
//                                     success: function (data, textStatus, jqXHR) {
//                                         // debugger;
//                                         // throw new Error('succc');
//                                         window.location = 'adm/quiz-plus/' + quiz_id  + '/drops';

//                                     },
//                                     error: function (jqXHR, textStatus, errorThrown) {
//                                         console.info("errrror");
//                                         // throw new Error('error');
//                                     }
//                                 });
//                             }

//                             $.post("learn/question/update_multiple", data_form, function (data_post)
//                             {
//                                 if (data_post.error) {
//                                     alert_box(data_post);
//                                 } else {

//                                     localMsg(quiz_default);

//                                     window.location = 'adm/quiz-plus/' + quiz_id  + '/drops';
//                                 }
//                             });

//                             window.location = 'adm/quiz-plus/' + quiz_id  + '/drops';

//                         },
//                         error: function (jqXHR, textStatus, errorThrown) {

//                             console.info("errrror");
//                             // throw new Error('error');

//                         }
//                     });

//                     return false;
//                 });
//             }
//         });


// }


// function check_id($content, id_complete) {

//     var id = 1;

//     for (i = 1; $content.find(id_complete + id).length > 0; i++) {
//         id = i;
//     }

//     return id;

// }

// function add_class(){

//     quiz_default = {
//         publishin: "",
//         name: "",
//         description: "",
//         finishin: "",
//         class_title: "Adicionar turma",
//         learn_id: extract_url(2),
//         status_checked_1: 'checked=checked',
//         status_1: 'active'
//     };

//     $quiz_content = insert_data(quiz_default, $( "#quiz-content" ).data( "var"));

//     $("#post-statistic-modal").modal('show');

//     $("#post-statistic-modal .modal-body .load").fadeOut(1000);

//     var $quiz_content = $("#quiz-content");

//     $filevideo = $quiz_content.find("#input-video");
//     check_icons();
//     $quiz_content.find('form').submit(function (e) {

//         // alert('submit intercepted');
//         e.preventDefault(e);

//         var quiz_id = extract_url(2);

//         var data_form = $(this).serialize();

//         if($('#input-users').val() == null || $('#input-users').val() == ""){
//             var click_confirm = modal_confirm_return('Turma sem usuários, confirma?');
//             click_confirm.click(function () {
//                 save_class(data_form, 'learn/quizClass/create', quiz_id);
//             });
//         } else {

//             save_class(data_form, 'learn/quizClass/create', quiz_id);
//         }

//         return false;

//     });

//     add_datetime_picker();


// }

// function save_class(data_form, action, learn_id) {
//     $.post(action, data_form, function (turma) {
//         if (turma.error) {
//             alert_box(turma);
//         } else {

//             data_form = data_form + '&learn_id=' + learn_id;

//             var quiz_default = {};
//             quiz_default.msg = "Turma criada com sucesso";
//             localMsg(quiz_default);

//             // throw new Error('dda');
//             window.location = 'adm/quiz-plus/' + learn_id  + '/classes';
//         }
//     });
// }


// function update_class(quiz_id, class_id){

//     $quiz_content = $( "#quiz-content" ).data( "var" );

//     $.post('learn/quiz/'+quiz_id+'/class/'+class_id, '', function (data) {
//         if (data.error) {

//             alert_box(data);

//             return false;
//         } else {

//             var quiz_default = {
//                 text_submit: "Salvar",
//                 description: (data[0].description != null ? data[0].description : "" ),
//                 name: (data[0].name != null ? data[0].name : "" ),
//                 finishin: data[0].finishin_port,
//                 publishin: data[0].publishin_port,
//                 id: 0,
//                 order: 1,
//                 title: "",
//                 class_title: "Alterar Turma",
//                 quiz_not_found: false,
//                 quiz_not_found_class: '',
//                 checked_type_1: ( data[0].type == 1  ? "selected=selected" : ""),
//                 checked_type_2: ( data[0].type == 2  ? "selected=selected" : ""),
//                 status_checked_1: ( data[0].status == 1  ? "checked=checked" : ""),
//                 status_1: ( data[0].status == 1  ? "active" : ""),
//                 status_checked_0: ( data[0].status == 0 || data[0].status == null  ? "checked=checked" : ""),
//                 status_0: ( data[0].status == 0 || data[0].status == null  ? "active" : ""),
//                 learn_id: quiz_id,
//                 action: 'learn/class/update',
//                 // action: 'adm/quizplus/drop_create',
//                 msg: "Drop salvo",
//                 use_data_return: 'learn_id',
//             };

//             quiz_default.finishin_class = '' ;
//             quiz_default.finishin_checked = '' ;
//             quiz_default.finishin_disabled = '' ;

//             $qc = insert_data(quiz_default, $quiz_content);

//             $quiz_content = $("#quiz-content");

//             $array = [];

//             for (i in data[0].users) {
//                 $array[i] = data[0].users[i].user_id ;
//             }

//             insert_select_users($quiz_content, $array, class_id);

//             insert_instructor($quiz_content, data[0].instructor_id);

//             add_datetime_picker();
//             check_icons();

//             $("#post-statistic-modal").modal('show');

//             $("#post-statistic-modal .modal-body .load").fadeOut(1000);

//             $quiz_content.find('form').submit(function (e)
//             {
//                 page_loading("show");

//                 e.preventDefault(e);

//                 var form = $(this);

//                 var data_form = $(this).serialize();

//                 if($('#input-users').val() == null || $('#input-users').val() == ""){
//                     page_loading();

//                     var click_confirm = modal_confirm_return('Turma sem usuários, confirma?');

//                     click_confirm.click(function () {

//                         page_loading("show");

//                         save_class(data_form, 'learn/quizClass/update/'+class_id, quiz_id);
//                     });

//                 } else {

//                     save_class(data_form, 'learn/quizClass/update/'+class_id, quiz_id);
//                 }

//                 return false;
//             });
//         }
//     });
// }


// function change_file($inputfile) {
//     $inputfile.click();

//     $inputfile.change(function () {
//         var $group = $(this).closest('.input-group');

//         if ($(this).val() == '' || $(this).val() == undefined) {
//             $group.find('button').click();
//         } else {
//             $group.removeClass('hide');

//             var file = $(this).val(),
//                 file_name = file.split('\\');

//             file_name = file_name.pop();

//             file_name = (file_name != '') ? file_name.slice(0, -4) : '';

//             $group.find('input[type="text"]').val(file_name);
//         }
//     });
// }
// function click_submit_files(){

//     $(".btn-send,button[type=submit]").click(function (event) {

//         console.info("aaa"+$('input[name=learncontenttype_id]:checked', '#drop_form').val());
//         error = false;
//         if($('input[name=learncontenttype_id]:checked', '#drop_form').val() == 3) {
//             if (error == false && checar($('#content_3'), 2) == false) {
//                 error = true;
//                 event.preventDefault();
//             }
//         }

//         if($('input[name=learncontenttype_id]:checked', '#drop_form').val() == 4) {
//             if (error == false && checar($('#content_4'), false) == false) {
//                 error = true;
//                 event.preventDefault();
//             }
//         }


//     });

// }

// function insert_questions_blank($quiz_content_b, asdf, questions) {

//     // so pra melhor construção do array no end point
//     $blank_id = $( "#quiz-content" ).data( "blank_id" );
//     $blank_id++;
//     $( "#quiz-content" ).data( "blank_id", $blank_id );

//     $quiz_content = $('#quiz-content');

//     var $questions = $quiz_content.find('#container-question');


//     var question = {
//         question_id: $blank_id,
//         new_question: 1,
//         question_title: "",
//         question_weight: "",
//         class_new_question: true
//     };

//     var output_questions = fill_template($questions, question, 'template-question');

//     $questions.append(output_questions);

//     for (i = 1; i <= $blank_id; i++) {

//         $("#question-"+i).find('.question-delete').click(function () {
//             var $box_question = $(this).closest('.box-question');

//             $box_question.fadeOut(function () {
//                 $box_question.remove();
//             })
//         });

//         $("#question-"+i).find('.add-answer').click(function () {
//             var quiz_default = $("#quiz-content").data('quiz-default'),
//                 $question = $(this).closest('.box-question'),
//                 question_id = $question.attr('id').replace('question-', ''),
//                 answers = [];


//             get_template($('.container-answer'), 'template-answer');

//             insert_answer_blank($questions, $blank_id, true);

//         });

//     }
//     insert_answer_blank($questions, $blank_id, true);

// }


// function insert_answer_blank($questions, answer_id, focus) {

//     $answer_id_blank = $( "#quiz-content" ).data( "blank_id_answer");
//     $answer_id_blank++;
//     $( "#quiz-content" ).data( "blank_id_answer", $answer_id_blank);

//     $question = $questions.find('#question-' + answer_id);
//     $answers = $question.find('.container-answer');

//     var answer = {
//         answer_id: $answer_id_blank,
//         new_answer: 1,
//         answer_title: "",
//         checked_class_0: 'active',
//         answer_checked_0: 'checked=checked',
//         class_new_answer: false
//     };

//     output_answers = fill_template($answers, answer, 'template-answer');
//     $answers.append(output_answers);

//     // $answers.find('.box-answer:last .item:first input').focus();

//     $answers.find('.answer-delete').click(function () {
//             var $answer = $(this).closest('.box-answer');

//             $answer.fadeOut(function () {
//                 $answer.remove();
//             })
//     });
//     answer_radio_change_checked()
// }


// function insert_answers($questions, answers, focus) {

//     if (Object.keys(answers).length > 0) {

//         var answers_ids = [];

//         for (idq in answers) {
//             var $question = $questions.find('#question-' + idq),
//                 $answers = $question.find('.container-answer'),
//                 output_answers = '';

//             for (a in answers[idq]) {
//                 var answer = {
//                     answer_id: answers[idq][a].id,
//                     new_answer: 0,
//                     answer_title: answers[idq][a].title,
//                     answer_checked_1: (answers[idq][a].weight == 1) ? "checked" : "",
//                     answer_checked_0: (answers[idq][a].weight == 0) ? "checked" : "",
//                     class_new_answer: false
//                 };

//                 answers_ids[answer.answer_id] = '#question-' + idq + '-answer-' + answer.answer_id;

//                 answer.checked_class_1 = (answer.answer_checked_1 == "checked") ? "active" : "";
//                 answer.checked_class_0 = (answer.answer_checked_0 == "checked") ? "active" : "";

//                 output_answers += fill_template($answers, answer, 'template-answer');

//             }

//             $answers.append(output_answers);

//             if (focus == true) {
//                 // $answers.find('.box-answer:last .item:first input').focus();
//             }
//         }

//         for (i in answers_ids) {
//             $(answers_ids[i]).find('.answer-delete').click(function () {
//                 var $answer = $(this).closest('.box-answer');

//                 $answer.fadeOut(function () {
//                     $answer.remove();
//                 })
//             });
//         }
//     }

//     answer_radio_change_checked();

// }

// function insert_questions($quiz_content, questions, focus) {

//     var $questions = $quiz_content.find('#container-question');

//     var $canswer = $quiz_content.find('#container-answer');

//     if (Object.keys(questions).length > 0) {

//         var output_questions = '',
//             answers = [],
//             newanswers = {},
//             questions_ids = [],
//             output_answers = '';

//         var q = 0;
//         for (q in questions) {

//             var question = {
//                 question_id: questions[q].id,
//                 new_question: 0,
//                 question_title: questions[q].title,
//                 question_weight: questions[q].points,
//                 class_new_question: (questions[q].new) ? true : false
//             };


//             if(questions[q].id == 1){
//                 continue;
//             }

//             answers[questions[q].id] = {};

//             for(idanswer in questions[q].answers){

//                 answers[questions[q].id][questions[q].answers[idanswer].id] = questions[q].answers[idanswer];

//             }

//             questions_ids[questions[q].id] = "#question-" + question.question_id;

//             output_questions += fill_template($questions, question, 'template-question');

//             q++;
//         }

//         $questions.append(output_questions);

//         if (focus == true) {
//             // $questions.find('.box-question:last .item:first input').focus();
//         }

//         if (answers) {

//             for (idq in answers) {

//                 var $question = $questions.find('#question-' + idq);

//                 var $answers = $question.find('.container-answer');

//                 get_template($answers, 'template-answer');
//             }

//             for (i in questions_ids) {

//                 $(questions_ids[i]).find('.question-delete').click(function () {
//                     var $box_question = $(this).closest('.box-question');

//                     $box_question.fadeOut(function () {
//                         $box_question.remove();
//                     })
//                 });


//                 $(questions_ids[i]).find('.add-answer').click(function () {
//                     var quiz_default = $("#quiz-content").data('quiz-default'),
//                         $question = $(this).closest('.box-question'),
//                         question_id = $question.attr('id').replace('question-', ''),
//                         answers = [];

//                     insert_answer_blank($questions, question_id, true);

//                 });
//             }

//             insert_answers($questions, answers);

//         }
//     }
// }


// function insert_data(data, $quiz_content) {

//     output = fill_template($quiz_content, data, 'template-content');

//     $quiz_content.html(output);

//     clicks_gerais($quiz_content);

//     return $quiz_content;

// }

// function clicks_gerais($quiz_content){
//     // $("#a_visaousuario").click(function () {
//     //     $(".content_all").hide();
//     //     $("#visao_usuario").slideDown();
//     //     $("#visao_analitica").hide();
//     // });
//     //
//     // $("#a_visaoanalitica").click(function () {
//     //     $(".content_all").hide();
//     //     $("#visao_analitica").slideDown();
//     //     $("#visao_usuario").hide();
//     // });

//     $(".finalizar").click(function () {

//         // DD-MM-YYYY HH:mm:00
//         $('#input-finishin-input').val(getDateNow());
//     });

//     check_icons();

//     // $('.required').change(function() {
//     //     $('.req span').removeClass("glyphicon-ok")
//     //     if(this.value == 0) {
//     //         $(".perg").removeAttr('required');
//     //         $('.req span:not(:first)').addClass("glyphicon-ok")
//     //
//     //     } else {
//     //         $(".perg:first").prop('required',true);
//     //         $('.req span:first').addClass("glyphicon-ok")
//     //     };
//     // });

//     $('.status').change(function() {

//         $('.classactive span').removeClass("glyphicon-ok")
//         if(this.value == 1) {
//             $('.classactive span:first').addClass("glyphicon-ok")

//         } else if(this.value == 2) {
//             $('.classactive span:not(:first)').addClass("glyphicon-ok")

//         } else {
//             $('.classactive span:not(:first)').addClass("glyphicon-ok")
//         };

//     });
//     // $('.status').next("span").addClass("glyphicon-ok");

// }

// function check_icons(){
//     $('.active').find(".glyphicon").addClass("glyphicon-ok")
// }


// function status_class(class_id,status){
//     var quiz_id = extract_url(2);
//     $.post('learn/quiz/class/'+class_id+'/change_status/'+status, '', function (data_post) {
//         if (data_post.error) {
//             alert_box(data_post);
//         } else {
//             window.location.reload();
//         }
//     });


// }

// function delete_drop(drop_id){
//     var quiz_id = extract_url(2);
//     $.post('learn/drop/delete/'+drop_id, '', function (data_post) {
//         if (data_post.error) {
//             alert_box(data_post);
//         } else {

//             window.location = 'adm/quiz-plus/' + quiz_id  + '/drops';
//         }
//     });


// }

// function move_quizplus() {

//     quiz_default = {
//         msg: "Salvo"
//     }
//     var quiz_id = extract_url(2);
//     localMsg(quiz_default);
//     window.location = 'adm/quiz-plus/';
// }

// function move_classes(){

//     var quiz_id = extract_url(2);
//     window.location = 'adm/quiz-plus/' + quiz_id  + '/classes';


// }


// function add_datetime_picker(){

//     var $quiz_content = $("#quiz-content");

//     var $finishin = $quiz_content.find('#finishin');

//     $finishin.find('#input-finishin-input').datetimepicker({
//         locale: 'pt-br',
//         format: 'DD-MM-YY HH:mm:00',
//         ignoreReadonly: true,
//         allowInputToggle: true
//     });

//     $finishin.find('input[type="checkbox"]').click(function () {
//         if ($(this).is(':checked')) {
//             $finishin.removeClass('disabled');
//             $finishin.find('#input-finishin-input').prop('disabled', false);

//             $finishin.find('#input-finishin-input').datetimepicker({
//                 locale: 'pt-br',
//                 format: 'DD-MM-YY HH:mm:00',
//                 ignoreReadonly: true,
//                 allowInputToggle: true
//             });
//         } else {
//             $finishin.addClass('disabled');
//             $finishin.find('#input-finishin-input').prop('disabled', true).val('');
//         }
//     });

//     var $publishin = $quiz_content.find('#publishin');

//     $publishin.find('#input-publishin-input').datetimepicker({
//         locale: 'pt-br',
//         format: 'DD-MM-YY HH:mm:00',
//         ignoreReadonly: true,
//         allowInputToggle: true
//     });

//     $publishin.find('input[type="checkbox"]').click(function () {
//         if ($(this).is(':checked')) {
//             $publishin.removeClass('disabled');
//             $publishin.find('#input-publishin-input').prop('disabled', false);

//             $publishin.find('#input-publishin-input').datetimepicker({
//                 locale: 'pt-br',
//                 format: 'DD-MM-YY HH:mm:00',
//                 ignoreReadonly: true,
//                 allowInputToggle: true
//             });
//         } else {
//             $publishin.addClass('disabled');
//             $publishin.find('#input-publishin-input').prop('disabled', true).val('');
//         }
//     });

// }

// function insert_select_help($wiki_selected) {

//     var $quiz_content = $("#quiz-content"),
//         posts_ids = [];

//     $.post('ws/help/get/true', function (data_posts) {
//         var $select_posts = $quiz_content.find("select#content_2"),
//             output_posts = '';

//         for (i in data_posts.help) {
//             var post = {
//                 help_title: data_posts.help[i].title,
//                 help_id: data_posts.help[i].id
//             };

//             output_posts += fill_template($select_posts, post, 'template-help');
//         }

//         $select_posts.html(output_posts);

//         if($wiki_selected != null && $wiki_selected > 0) {
//             $('#content_2').val($wiki_selected).trigger('chosen:updated');
//         }

//     });
// }
// function answer_radio_change_checked() {

//     $('.asr').click(function() {
//         var parent = $(this).parent().parent();
//         parent.find("span").removeClass("glyphicon-ok");
//         $(this).find(".glyphicon").addClass("glyphicon-ok");

//     });
//     check_icons();

// }

// function insert_select_posts($post_selected) {

//     var $quiz_content = $("#quiz-content"),
//     posts_ids = [];

//     $.post('ws/post/get_basic/title_id', function (data_posts) {
//         var $select_posts = $quiz_content.find("select#content_1"),
//             output_posts = '';

//         for (i in data_posts) {
//             var post = {
//                 post_title: data_posts[i].title,
//                 post_id: data_posts[i].id
//             };

//             output_posts += fill_template($select_posts, post, 'template-post');
//         }

//         $select_posts.html(output_posts);

//         if($post_selected != null && $post_selected > 0) {
//             $('#content_1').val($post_selected).trigger('chosen:updated');
//         }

//     });
// }

// function insert_select_users($quiz_content, users_ids, class_id) {

//     if (class_id) {
//         $.post('ws/user/get_basic/0/name_lastname_id?status=1&class_id=' + class_id, function (data_users) {
//             var $select_users = $quiz_content.find("#input-users");

//             for (i in data_users) {
//                 console.info('>>');
//                 console.info(data_users);

//                 data_users[i].selected = (users_ids.length > 0 && $.inArray(data_users[i].id, users_ids) >= 0) ? 'selected' : '';
//                 $select_users.append('<option value="' + data_users[i].id + '" ' + data_users[i].selected + '>' + data_users[i].name + ' ' + data_users[i].lastname + '</option>');
//             }
//             console.info('<<<'+class_id+"dd");
//             console.info(users_ids);

//             $select_users.trigger("chosen:updated");

//             // $select_users.val(users_ids).change().chosen();
//             //
//             // $select_users.next().find('.chosen-results').attr('style', "display:none;");

//         });
//     } else {
//         // $('#input-users').removeAttr('disabled').chosen();
//     }
// }

// function insert_instructor($quiz_content, instructor_id) {

//     if (instructor_id) {
//         $.post('ws/user/get_basic/0/name_lastname_id?status=1&id_user=' + instructor_id, function (data_users) {
//             var $select_users = $quiz_content.find("select#input-instructor");

//             for (i in data_users) {
//                 data_users[i].selected = 'selected';
//                 $select_users.append('<option value="' + data_users[i].id + '" ' + data_users[i].selected + '>' + data_users[i].name + ' ' + data_users[i].lastname + '</option>');
//             }

//             $select_users.val(instructor_id).change().chosen();

//             $select_users.next().find('.chosen-results').attr('style', "display:none;");

//         });
//     } else {
//         $('#input-users').removeAttr('disabled').chosen();
//     }
// }



// function check_id($content, id_complete) {

//     var id = 1;

//     for (i = 1; $content.find(id_complete + id).length > 0; i++) {
//         id = i;
//     }

//     return id;

// }





    <link rel="stylesheet" type="text/css" href="/blog/public/assets/css/bootstrap.css?v=v1.113.22"/>
    
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/css/font-awesome.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/css/bootstrap-theme.css?v=v1.113.22"/>
    
    
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/dataTables/extensions/Responsive/css/responsive.bootstrap.min.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/dataTables/media/css/dataTables.bootstrap.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/dataTables/media/css/jquery.dataTables.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/css/dataTables.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/croppie/croppie.min.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/datetimepicker/css/bootstrap-datetimepicker.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/dataTables/extensions/ColReorder/css/colReorder.dataTables.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/dataTables/extensions/Colvis/css/dataTables.Colvis.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/dataTables/extensions/ColResize/css/dataTables.colResize.css?v=v1.113.22"/>
    <link rel="stylesheet" type="text/css" href="/blog/public/assets/adm/css/quizplus_form.css?v=v1.113.22"/>    

    
    
    <script type="text/javascript" src="/blog/public/assets/js/jquery-1.11.3.js?v=v1.113.22"></script>

    //modal etc
    <script type="text/javascript" src="/blog/public/assets/js/bootstrap.js?v=v1.113.22"></script>

    <script type="text/javascript" src="/blog/public/assets/adm/js/quizplus_form.js?v=v1.113.22"></script>

    <script type="text/javascript" src="/blog/public/assets/datetimepicker/js/bootstrap-datetimepicker.min.js?v=v1.113.22"></script>
    <script type="text/javascript" src="/blog/public/assets/dataTables/media/js/jquery.dataTables.js?v=v1.113.22"></script>
    <script type="text/javascript" src="/blog/public/assets/dataTables/media/js/dataTables.bootstrap.js?v=v1.113.22"></script>
    <script type="text/javascript" src="/blog/public/assets/dataTables/extensions/Responsive/js/dataTables.responsive.min.js?v=v1.113.22"></script>
    <script type="text/javascript" src="/blog/public/assets/dataTables/extensions/ColReorder/js/dataTables.colReorder.js?v=v1.113.22"></script>
    <script type="text/javascript" src="/blog/public/assets/dataTables/extensions/Colvis/js/dataTables.Colvis.js?v=v1.113.22"></script>
    <script type="text/javascript" src="/blog/public/assets/dataTables/extensions/ColResize/js/dataTables.colResize-modificado.js?v=v1.113.22"></script>



<div class="adm-box col-md-10 hg100">
    <div id="quiz-content">
        <div class="content-box quiz_create template-content">


            <?php echo isset($menucreate) ? $menucreate : NULL; ?>
            <div class="clearfix"></div>
            <div class="panel panel-default">
                <div class="relat panel-heading">
                    <div class=" "><h2>Turmas</h2></div>
                    <div class="clearfix"></div>
            </div>

                <div class="panel-body">
                    
                    <script>
                        $( function() {
//                    $( "#sortable" ).sortable();
//                    $( "#sortable" ).disableSelection();
                        } );
                    </script>

                    <br>

                    <div class="clearfix"></div>
                    <div class="gaph"></div>
                    <div class="row">
                        <div class="col-md-12 pattern-btn">
                            <button type="button" class="btn btn-question btn-warning" onclick="add_class()" id="add-drop">Adicione Turma
                            </button>
                        </div>
                    </div>
                    <br><br>
                    <table id="table-quiz" class="table">
                        <thead>
                        <tr>
                            <th width="12" data-id="checkbox">&nbsp;</th>
                            <th data-id="id">Id</th>
                            <th class="namecolumn" data-id="name">Name</th>
                            <th class="namecolumn" data-id="instructor_name">Instrutor</th>
                            <th data-id="presencial">Presencial<br>ou Online</th>
                            <th data-id="qtd_users">Quantidade de usuários</th>
                            <th class="dtcolumn" data-id="data_inicial">Data Inicial</th>
                            <th class="dtcolumn" data-id="data_final">Data Final</th>
                            <th data-id="finalizado">Finalizado</th>
                            <th width="200" data-id="action">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($output['learnclass'] as $row):  ?>
                            <tr>
                                <td>
                                </td>
                                <td><?php echo $row["id"] ?></td>
                                <td><?php echo $row["name"] ?></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>fd</td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div class="btn-group">
                                        <a title="Alterar Turma" onclick="update_class()" class="btn btn-default"> <i class="fa fa-edit"></i></a>
                                        <a title="Duplicar Turma" onclick="duplicate_class()" class="btn btn-default"> <i class="fa fa-files-o"></i></a>
                                    </div>
                                </td>

                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <br><br>
            <div class="modal fade post-statistic-modal template-content" tabindex="-1" role="dialog" id="post-statistic-modal"
                 aria-labelledby="post-statistic-modal"
                 aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">fdfdsf</h4>
                        </div>
                        <div id="content-modal">
original
                        </div>

                        <form action="aspodifj" method="post">
                            <input type="hidden" id="learn_id" name="learn_id" value="">
                            <div class="modal-body">
                                <i class="fa fa-refresh fa-spin fa-3x fa-fw load"></i>
                                <div class="statistic-content">

                                    <div class="row">
                                        <div class=" title-quiz col-xs-12">

                                            <label for="input-title" class="label_title">Nome</label>
                                            <input type="text" class="form-control input-title" value="" name="name"
                                                   id="input-title" required>
                                        </div>
                                    </div>

                                    <div class="clearfix"></div>
                                    <div class="gap"></div>

                                    <div class="row">
                                        <div class=" title-quiz col-xs-12">
                                            <label for="input-text" class="label_text">Descrição</label>
                                            <textarea class="form-control input-text" name="description" id="input-description" name="text" id="input-text"></textarea>
                                        </div>
                                    </div>

                                    <div class="clearfix"></div>
                                    <div class="gap"></div>

                                    <div class="row">
                                            
                                    </div>

                                    <div class="row">
                                        <div class=" col-xs-12">
                                            <bR>
                                            <label for="input-post" class="label_post">Selecione o instrutor</label>
                                            <div class="input-group super-filter">
                                                <select class="form-control" name="instructor_id" data-placeholder="Nenhum participante cadastrado"
                                                        id="input-instructor">
                                                </select>
                                                <span class="input-group-btn btn-group-vertical">
                                                    <a class="btn sfilterbutton btn-superfiler"
                                                       onclick="superfilter('select#input-instructor');">Adicionar Instrutor</a>
                                                    <a class="btn sfilterbutton btn-superfiler btn-superfiler-clear"
                                                       onclick="superfilter_clear_list('select#input-instructor');">Limpar</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class=" col-xs-12">
                                            <bR>
                                            <label for="input-post" class="label_post">Convide ou remova participantes</label>
                                            <div class="input-group super-filter">
                                                <select class="form-control" name="user_id[]" multiple data-placeholder="Nenhum participante cadastrado"
                                                        id="input-users">
                                                </select>
                                                <span class="input-group-btn btn-group-vertical">
                                                    <a class="btn sfilterbutton btn-superfiler"
                                                       onclick="superfilter('select#input-users');">Adicionar participantes</a>
                                                    <a class="btn sfilterbutton btn-superfiler btn-superfiler-clear"
                                                       onclick="superfilter_clear_select('select#input-users');">Limpar lista</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <table>
                                            <tr>
                                                <td>
                                                        <div class="col-md-4 wid50 datetd">
                                                            <bR>
                                                            <label for="input-publishin-input" class="label_title">Publicar a partir de:</label>
                                                            <div class='input-group date input-group' id='publishin'>
                                                                <input type='text' class="form-control" value="" name="publishin" value="" id="input-publishin-input" />
                                                                <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-calendar"></i>
                                                    </span>
                                                            </div>
                                                        </div>
                                                </td>
                                                <Td>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                </Td>
                                                <td>
                                                    <div class="row">
                                                        <div class=" col-md-4 wid50 datetd">
                                                            <bR><bR>
                                                            <label for="input-finishin-input" class="label_title">Finaliza em:</label>
                                                            <div class='input-group date input-group ' id='finishin'>
                                                                <input type='text' class="form-control" value="" name="finishin" value="" id="input-finishin-input" />
                                                                <span class="input-group-addon">
                                                                    <i class="glyphicon glyphicon-calendar"></i>
                                                                </span>
                                                            </div>
                                                            &nbsp;&nbsp;&nbsp;
                                                        </div>
                                                    </div>

                                                </td>
                                                <Td>

                                                </Td>
                                                <td><bR>
                                                    <button type="button" class="btn btn-gray finalizar">Finalizar agora</button>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <div class="btn-group status-btn mgtl classactive glyphi d-block"
                                                         data-toggle="buttons">
                                                        <label class="btn btn-md btn-success col-sm-6 col-md-6 ">
                                                            <input type="radio"
                                                                   name="status" class="status"
                                                                   value="1"
                                                                   autocomplete="off"
                                            
                                                            <span class="glyphicon"></span>
                                                            Ativado
                                                        </label>
                                                        <label class="btn btn-md btn-danger col-sm-6 col-md-6 ">
                                                            <input type="radio"
                                                                   name="status" class="status"
                                                                   value="0"
                                                                   autocomplete="off"
                                            
                                                            <span
                                                                    class="glyphicon"></span>
                                                            Desativado
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="fright">
                                        <button type="submit" class="btn btn-send">Salvar</button>
                                    </div>
                                    <div class="fright">
                                        <button type="button" class="btn cancel-but btn-gray" data-dismiss="modal">Cancelar</button>
                                    </div>

                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="fright">
<!--                <button type="button" onclick="move_quizplus()" class="btn btn-send">Concluir</button>-->
            </div>

        </div>
    </div>
</div>


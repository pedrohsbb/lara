$(function () {
    if (jQuery().chosen) {
        $(document).ready(function () {
            function readFile(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.upload-demo').addClass('ready');
                        $uploadCrop.croppie('bind', {
                            url: e.target.result
                        }).then(function () {
                            $('.cr-slider').show();
                        });

                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }

            $('.upload-avatar-custom').hide();
            $uploadCrop = $('#upload-avatar-custom').croppie({
                viewport: {
                    width: 120,
                    height: 120,
                    type: 'circle'
                },
                boundary: {
                    width: 120,
                    height: 120
                },
                enableExif: true
            });

            $('#profile-image').on("change", function () {
                $('.upload-avatar-custom').show();
                readFile(this);
            });

            $('#avatar-profile-image').click(function () {
                $('.upload-avatar-custom').hide();
            });

            $('.cr-boundary').mouseout(function () {
                $uploadCrop.croppie('result', {
                    type: 'canvas',
                    size: 'viewport'
                }).then(function (resp) {
                    $('#profile-image').attr('type', 'text');
                    $('#profile-image').val(resp);
                });
            });
            $("#user-update").mouseover(function () {
                $uploadCrop.croppie('result', {
                    type: 'canvas',
                    size: 'viewport'
                }).then(function (resp) {
                    $('#profile-image').attr('type', 'text');
                    $('#profile-image').val(resp);
                });
            });

            $('.chosen').on('chosen:ready', function (evt, params) {
                var $select = $(this),
                    $chosen = params.chosen.container;

                if ($select.attr('required') != undefined) {
                    $select.insertAfter($chosen);
                    $select.addClass('select-chosen-required');
                }

            }).chosen();
        });
    }

    //localStorage.removeItem('timeout_refresh_list_channel');
    //localStorage.removeItem('timeout_refresh_list_users');
    custom_layout();


    if ($("meta[name='controller']").attr('content') != 'login' && $("meta[name='controller']").attr('content') != 'register') {
        quiz_amount(false, false);

        $(document).ready(function () {
            list_users(false);
            list_channel();
            points();
            levels();
            quiz_amount_ajax();
        });

        search_all();
        form_invite();
        form_beebot();
        form_profile();
    }


    $('#channel-create').click(function () {

        form_channel();

        return false;
    });

    var windowHeight = $(window).height(),
        headerHeight = $("header").height();

    $('.menu-resize').height(windowHeight - headerHeight);

    $(window).resize(function () {
        $('.menu-resize').height(windowHeight - headerHeight);
    });


    var data = localStorage.getItem('msg');
    alertMsg(data);

    $(".navbar-form .menu-plus > a, .navbar-form .menu-bookmark > a").on('mouseover', function () {
        if (!$(this).parent().hasClass('open')) $(this).trigger('click');
    });

    $("#search-team").click(function () {
        $(".header .navbar-right #search-ul").val(':Meu time:').focus().keyup().click();
        return false;
    });
    $("#search-chat").click(function () {
        $(".header .navbar-right #search-ul").val(':Canais:').focus().keyup().click();
        return false;
    });

    $('.external-add-emoji').emoji({type: 'create_emoji', action: 'click'});

    $('.open-widgets').on('mouseover click', function (e) {
        e.preventDefault();
        $('.widget-sub').hide();
        $('.widgets-menu').show();
    });

    var mouse_is_inside = false;
    $('.widgets-menu').hover(function () {
        mouse_is_inside = true;
    }, function () {
        mouse_is_inside = false;
    });

    $(document).mouseup(function () {
        if (!mouse_is_inside) {
            $('.widgets-menu').hide();
        }
    });

    $(".widgets-menu li a.has-sub").click(function (e) {
        e.preventDefault();
        var id = $(this).attr('rel');
        $('.widgets-menu').hide();
        $(id).show();
    });

    $('.back').click(function (e) {
        e.preventDefault();
        $('.widget-sub').hide();
        $(this).parent().hide();
        $('.widgets-menu').show();
    });

    $('.dropdown-toggle').click(function (e) {
        $('.widgets-menu').hide();
    });

    $('.checkall').click(function (e) {
        var $form = $(this).closest('form');
        $form.find('.checkall-item').prop('checked', $(this).is(':checked'));
        if ($(this).is(':checked')) {
            $('.mass_actions').show();
        } else {
            $('.mass_actions').hide();
        }
    });

    $(document).on('click', '.checkall-item', function () {
        var numberOfChecked = $('input[name="id[]"]:checked').length;
        console.log(numberOfChecked);
        if (numberOfChecked > 0) {
            $('.mass_actions').show();
        } else {
            $('.mass_actions').hide();
        }
    });

    $(".btn-select-all").on('click', function (e) {
        e.preventDefault();
        var select_id = $(this).attr('data-select');
        $(select_id).find("option").each(function () {
            $(this).prop('selected', true);
        });
        $(select_id).trigger("chosen:updated");
    });
    $(".btn-deselect-all").on('click', function (e) {
        e.preventDefault();
        var select_id = $(this).attr('data-select');
        $(select_id).find("option").each(function () {
            $(this).prop('selected', false);
        });
        $(select_id).trigger("chosen:updated");
    });

    $("#logout").click(function () {
        for (var key in localStorage) {
            localStorage.removeItem(key);
        }
    });


    var controller = $('meta[name="controller"]').attr('content'),
        method = $('meta[name="method"]').attr('content'),
        controller_method = controller + '_' + method,
        controller_method_exc = [
            'dashboardexcel_index'
        ];

    if (method != 'index' && $.inArray(controller_method, controller_method_exc) == -1) {
        window.onload = function () {
            wait(1000);
            $('.page_loading').hide();
        }
    }

    $(".inf-group label:not(.force-columns-view)").click(function () {
        if ($(this).hasClass('active-label')) {
            if ($('#ui-layout-east').css('display') != 'none') {
                $('#ui-layout-east-toggler').click();
            }
            $(".inf-group label").removeClass('active-label');
        } else {
            if ($('#ui-layout-east').css('display') == 'none') {
                $('#ui-layout-east-toggler').click();
            }

            $(".inf-group label").removeClass('active-label');

            $(this).addClass('active-label');
        }
    });
    $(".inf-group label.force-columns-view").click(function () {
        $(".inf-group label").removeClass('active-label');
        $('#ui-layout-east-toggler').click();
        setTimeout(function () {
            if ($('#ui-layout-east').css('display') != 'none') {
                var data_id = $('#ui-layout-east .scroll > div:visible').data('id');
                $(".inf-group label[data-id='" + data_id + "']").addClass('active-label');
            }
        }, 500);
    });

    activate_link();

});

function activate_link() {
    var loc = window.location.href,
        base_loc = $("base").attr('href');

    loc = loc.replace(base_loc, './');

    $("[href='" + loc + "']").closest('.default-style').addClass('active-btn');


}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

function extract_url(key_array_hash) {
    var href = window.location.href,
        hash = window.location.hash,
        base = $('base').attr('href');
    href = href.replace(base, '');
    href = (href != "/") ? href.split("/") : [];
    href = href.filter(Boolean);

    if (key_array_hash != undefined) {
        if (key_array_hash == "#" || key_array_hash == "hash") {
            return (hash) ? hash : false;
        }
        else if (!isNaN(parseFloat(key_array_hash)) && isFinite(key_array_hash)) {
            return href[key_array_hash];
        }
        else if (key_array_hash == 'first' || key_array_hash == 'last') {
            return (key_array_hash == 'first') ? href[0] : href[href.length - 1];
        }
    } else {

        return {href: href, hash: hash};
    }
}

function get_template(list_item, template_name) {

    if (undefined == template_name) {
        template_name = 'template';
    }

    var $list_item = $(list_item);
    var template = $list_item.data(template_name);
    if (undefined == template) {
        var $template = $list_item.find('.' + template_name);
        if ($template.length != 0) {
            template = $template[0].outerHTML;
            template = template.replace(template_name, '');
            template = template.replace('___src___', 'src');
            $template.remove();
            $list_item.data(template_name, template);
        } else {
            console.log('Template: "' + template_name + '" was not found in "' + list_item.html() + '');
            console.log('Callee: "' + arguments.callee.caller.toString());
        }
    }

    return template;
}

function fill_template(list_item, data, template_name) {

    var template = get_template(list_item, template_name);

    for (i in data) {
        template = template.split('{{' + i + '}}').join(data[i]);
    }
    return template;
}

function alert_box(data) {
    for (i in data.error) {
        if (data.error[i] != undefined) {
            $('.global-inf').prepend('<div class="alert alert-danger fade in">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + data.error[i] + '</div>')
        }
    }
    if (data.msg && data.msg.length > 0) {
        $('.global-inf').prepend('<div class="alert alert-success fade in">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            '<i class="fa fa-check-square-o" aria-hidden="true"></i> ' + data.msg + '</div>')
    }
}

function getDateNow(){

    // format: DD-MM-YY HH:mm:00

    Number.prototype.padLeft = function(base,chr){
        var  len = (String(base || 10).length - String(this).length)+1;
        return len > 0? new Array(len).join(chr || '0')+this : this;
    }


    var d = new Date;
    var year = d.getFullYear().toString();
    var yearhalf = year.slice( -2 )
    var dformat = [d.getDate().padLeft(),
                (d.getMonth()+1).padLeft(),
                yearhalf].join('-') +' ' +
            [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join(':');

    return dformat;
}
function compareDateToNow($dateWithTime){

    var date = $dateWithTime.split(" ");
    var date = date[0];

    var expireDateArr = date.split("-");
    var expireDate = new Date(expireDateArr[0], expireDateArr[1] - 1, expireDateArr[2]);
    var todayDate = new Date();

    // console.info("hoje: " + todayDate + "é depois de final?" + expireDate);

    if (todayDate > expireDate) {
        return true;
    } else {
        return false
    }

}
function alertMsg(data) {
    if (data !== null) {
        $('.global-inf').prepend('<div class="alert alert-success fade in">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            '<i class="fa fa-check-square-o" aria-hidden="true"></i> ' + data + '</div>')

        localStorage.removeItem('msg')
    } else {

    }
}
function alertMsgFadeOut(data, seconds) {
    if (data !== null) {
        $('.global-inf').prepend('<div class="alert alert-success fade in">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            '<i class="fa fa-check-square-o" aria-hidden="true"></i> ' + data + '</div>')

        localStorage.removeItem('msg')
    } else {

    }

    var milesimos = seconds * 1000;

    $('.alert-success').fadeOut(milesimos);
}


function alertErrorMsg(data) {
    if (data !== null) {
        $('.global-inf').prepend('<div class="alert alert-danger fade in">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            '<i class="fa fa-check-square-o" aria-hidden="true"></i> ' + data + '</div>')

        localStorage.removeItem('msg')
    } else {

    }
}
function alertErrorMsgFade(data,seconds) {
    if (data !== null) {
        $('.global-inf').prepend('<div class="alert alert-danger fade in">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            '<i class="fa fa-check-square-o" aria-hidden="true"></i> ' + data + '</div>')

        localStorage.removeItem('msg')
    } else {

    }
    var milesimos = seconds * 1000;

    $('.alert-danger').fadeOut(milesimos);

}
function localMsg(data) {
    localStorage.setItem('msg', data.msg);
}

function set_points(data, template) {
    data = data.userscore;
    data[0].total = data[0].score;

    if (data[0].level == null || data[0].level == '') {
        data[0].level = data[0].nextLevel;
    }

    output = fill_template(template, data[0]);

    template.html(output);

    var diff = 0;
    var bar = 0;
    var title = '';
    var score_txt = '';

    if (data[0].nextScore != null && data[0].nextLevel != null) {
        diff = data[0].nextScore - data[0].score;
        bar = (data[0].score / data[0].nextScore) * 100;
        title = 'Faltam ' + diff + ' para o nível ' + data[0].nextLevel;
        score_txt = data[0].total + '/' + data[0].nextScore;
    } else {
        bar = 100;
        title = 'Parabéns você chegou ao nível máximo.';
        score_txt = data[0].total;
    }


    $("#tooltip-score").attr('title', title);
    $("#progress-score").html(score_txt);
    $("#bar-score").css('width', bar + '%');
    localStorage.myScore = data[0].score;
}

function clear_data_score_me() {
    localStorage.removeItem('data_score_me');
    points();
}

function get_mypoints($this) {
    var currentLocation = window.location.pathname;

    var template = $this,
        data_score_me = localStorage.getItem('data_score_me');

    if (data_score_me != null && currentLocation != '/extrato-de-pontos') {
        var data = JSON.parse(data_score_me);
        set_points(data, template);
    } else {
        $.post('ws/user/score/me', function (data) {
            set_points(data, template);
            localStorage.setItem('data_score_me', JSON.stringify(data));
        });
    }
}

function levels() {
    $.post('ws/level/get', function (data) {
        var output = '';
        var largura = 100 / data.length;
        var myScore = localStorage.myScore;
        var background = $("#bar-score").css('background-color');
        var color = $("#bar-score .progress-icon").css('color');

        $('#level-points').html(' - ' + myScore + ' pontos');
        if (data.length < 4) {
            $('#levels .modal-dialog').removeClass('modal-md');
            $('#levels .modal-dialog').addClass('modal-sm');
        }
        if (data.length > 7) {
            $('#levels .modal-dialog').removeClass('modal-md');
            $('#levels .modal-dialog').addClass('modal-lg');
        }
        data.sort(sortByScore);
        var c = 1;
        for (i in data) {
            var diff = 0,
                bar = 0,
                points = '',
                title = '',
                doneClass = '',
                custom_font_color2 = '';
            if (parseInt(myScore) >= parseInt(data[i].score)) {
                bar = 100;
                title = 'Nível ' + data[i].name + ' completado.';
                doneClass = 'step-done';
                custom_font_color2 = 'border-color:' + color + ';color:' + color + ';';
                //points = data[i].score;
            } else {
                diff = data[i].score - myScore;
                if (c == 1) {
                    bar = (myScore / data[i].score) * 100;
                } else {
                    bar = 0;
                }
                title = 'Faltam ' + diff + ' para o nível ' + data[i].name;
                //points = myScore+'/'+data[i].score;
                c++;
            }
            output += '<li class="' + doneClass + '">';
            output += '<div class="progress" title="' + title + '">';
            output += '<span class="progress-icon fa fa-check" style="' + custom_font_color2 + '"></span>';
            output += '<div class="progress-bar" style="background-color:' + background + ';width:' + bar + '%"></div>';
            output += '</div>';
            output += '<span class="step-name" title="' + data[i].name + '">' + data[i].name + '</span>';
            output += '<span class="step-points" title="' + data[i].score + '">' + data[i].score + '</span>';
            output += '</li>';
        }
        $("#levels-progress").html(output);
        $("#levels-progress li").css('width', largura + '%');
    });
}
function sortByScore(a, b) {
    return a.score - b.score;
}
function points() {

    var points = $('.my_points'),
        level = $('.my_level'),
        output = '',
        get_mypoints_status = false;

    points.each(function () {
        var $this = $(this);
        if (points.length != 0) {
            get_mypoints_status = true;
            get_mypoints($this);
        }
    });

    level.each(function () {
        var $this = $(this);
        if (level.length != 0) {
            get_mypoints_status = true;
            get_mypoints($this);
        }
    });

    if (get_mypoints_status) {

    }
}


function list_users(reload_users) {
    var users = $('.posts .list-group'),
        output = '';
    if (users.length != 0) {
        $.post('ws/dmtray/get', function (data) {
            data.dmtray.sort(function (a, b) {
                return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
            });
            for (i in data.dmtray) {

                if (data.dmtray[i].unread > 0) {
                    notify_dm_user(data.dmtray[i]);
                } else {
                    data.dmtray[i].unread = '';
                }
                output += fill_template(users, data.dmtray[i]);
            }
            users.html(output);

            users.find('.close_dm').click(function () {
                var id = $(this).data('id');

                $.post('ws/dmtray/delete', {
                    id: id
                }, function (data) {
                    list_users(true);
                });

                return false;
            });

            setTimeout_refresh(60000, 50, 'list_users');

        });
    }

    get_list_open(users.parent().find('label[for="checklistdm"]'));

    if (!reload_users) {

        // List Chosen
        var $users_chosen = $('#modal-list-users select'),
            output2 = '';

        if ($users_chosen.length > 0 && $('.posts .post-title a').length > 0) {

            $('.posts .post-title a').removeClass('hide').click(function () {

                $("#modal-list-users").modal('show');

                if (!$users_chosen.hasClass('load_chosen')) {

                    $users_chosen.prepend("<option selected>Aguarde...</option>").prop('disabled', true);

                    $.post('ws/user/get_basic/0/name_lastname_username', function (data) {

                        var me_id = me('id');

                        for (i in data) {
                            var id_user = data[i].id;
                            if (id_user != me_id) {
                                output2 += fill_template($users_chosen, data[i]);
                            }
                        }
                        output2 = "<option></option>" + output2;

                        $users_chosen.html(output2);

                        $users_chosen.prop('disabled', false);

                        //$("#modal-list-users").modal('show').on('shown.bs.modal', function () {

                        $users_chosen.chosen({
                            no_results_text: "Oops, usuário não encontrado!",
                            allow_single_deselect: true
                        }).change(function () {
                            window.location = $(this).val();
                        });

                        $users_chosen.trigger("chosen:open");
                        //});

                        $users_chosen.addClass('load_chosen');

                    });
                }

                return false;
            });
        }
    }
}

function channel_private_footer($channelprivate) {
    var $channeltype = $channelprivate.closest(".channel-type-footer");
    //alert($('.channel-type-footer').hasClass("checked-input"));

    if ($('.channel-type-footer').hasClass("checked-input")) {
        $channeltype.removeClass('checked-input');
        $("#modalChannel select").removeAttr('required');
    } else {
        $channeltype.addClass('checked-input');
        $("#modalChannel select").attr('required', 'required');
    }
}


function list_channel() {
    var $listchannel = $(".channels .list-group"),
        output = '';

    if ($listchannel.length > 0) {

        $.post('ws/chattray/get', function (data) {

            for (i in data.list) {

                if (data.list[i].unread > 0) {
                    notify_chat(data.list[i]);
                } else {
                    data.list[i].unread = '';
                }

                if(data.list[i].private == 1) {
                    data.list[i].name = '<i class="fa fa-lock" aria-hidden="true"></i> ' + data.list[i].name;
                } else if(data.list[i].private == 3){
                    data.list[i].name = '<i class="fa fa-dot-circle-o" aria-hidden="true"></i> ' + data.list[i].name;
                } else{
                    data.list[i].name = '<i class="fa fa-hashtag" aria-hidden="true"></i> ' + data.list[i].name;
                }

                output += fill_template($listchannel, data.list[i]);
            }

            $listchannel.html(output);

            $listchannel.find('.close_channel').click(function () {
                var chatinfo_id = $(this).data('id');

                $.post('ws/chattray/delete', {
                    chatinfo_id: chatinfo_id
                }, function (data) {
                    list_channel();
                });

                return false;
            });

            get_list_open($listchannel.parent().find('label[for="checklistchannel"]'));

            setTimeout_refresh(60000, 20, 'list_channel');

        });
    }

}
var aux_autoload = 0;
function setTimeout_refresh(time, total_load, function_name) {
    aux_autoload++;

    if (aux_autoload <= total_load) {
        setTimeout(function () {
            var id_timeout = 'timeout_refresh_' + function_name,
                timeout_refresh = localStorage.getItem(id_timeout);


            //    localStorage.setItem(id_timeout, parseInt(timeout_refresh) + 1);
            window[function_name](true);
            //}
            //}
        }, time);
    }
}

function form_channel() {
    var $modalchannel = $("#modal-channel");
    var $channelprivate = $(".channel-type-footer label input", $modalchannel),
        $form = $("form", $modalchannel);
    var $channelusers = $($form.find("select[name='user_id[]']")),
        $channelname = $($form.find("input[name=name]")),
        output = '',
        me_user = me();

    $modalchannel.modal('show').on('shown.bs.modal', function () {
        $channelname.focus();

        if ($channelprivate.is(":checked")) $channelprivate.trigger('click');

        $channelname.val('');

        $channelprivate.click(function () {
            channel_private_footer($channelprivate);
        });

        $channelusers.chosen({
            no_results_text: "Nenhum participante cadastrado"
        });

        if ($("#input_me", $form).length < 1) $form.append("<input id=\"input_me\" type=\"hidden\" name=\"user_id[]\" value=\"" + me_user.id + "\">");


        $form.submit(function () {
            var dataForm = $form.serialize();
            if($('.channel-type-footer').hasClass( "checked-input")){
                dataForm += '&private=1';
            }

            $form.find('button').attr('disabled', 'disabled');
            $channelname.attr('disabled', 'disabled');

            $.post('ws/chat/create', dataForm, function (data) {
                $channelusers.attr('disabled', 'disabled').trigger("chosen:updated");
                if (data.error) {
                    alert_box(data);
                    console.log(data.console);
                    $channelusers.removeAttr('disabled').trigger('chosen:upadate');
                } else {
                    window.location = "channel/" + data.chatinfo.id + "/" + data.chatinfo.name_sanitized;
                }
                $form.find('button').removeAttr('disabled');
                $channelname.removeAttr('disabled');
            })


            return false;
        });

        $modalchannel.modal('show').off('shown.bs.modal');
    });
}

function get_me(data) {

    if (data && data != undefined) {
        localStorage.setItem('me', JSON.stringify(data));
        return data;
    } else {

        var me = localStorage.getItem('me');

        if (me) {
            return $.parseJSON(me);

        } else {
            var jqXHR = $.ajax({
                url: 'ws/user/get_basic/me',
                async: false,
                type: 'GET'
            });

            return get_me($.parseJSON(jqXHR.responseText));

        }
    }
}

function me(item) {
    var m = get_me();

    if (item != '' && item != undefined) {
        for (i in m) {
            if (i == item) m = m[i];
        }
    }

    return m;
}

function get_custom() {
    var custom = localStorage.getItem('custom');

    if (custom && custom != "[]") {
        return $.parseJSON(custom);
    } else {
        $.get('ws/custom/get', function (data) {
            if (data) {
                localStorage.setItem('custom', JSON.stringify(data));
                custom_layout(data);
            }
        });
    }
}

function remove_me() {
    localStorage.removeItem('me');

    location.reload();
}

function custom_layout(data) {
    var custom = (data != undefined) ? data : get_custom();

    if (custom) {
        $('#custom-text').text(custom.text);
        custom.logo = (custom.logo) ? custom.logo : './assets/img/logo.png';
        $(".custom-logo").attr("src", custom.logo);
        $(".custom_color1").css("background-color", custom.color1);
        $(".custom_color2").css("background-color", custom.color2);
        $(".custom_font_color1").css("color", custom.color1);
        $(".custom_font_color2").css("color", custom.color2);

        rgb = hexToRgb(custom.color1);

        if (rgb) {
            $(".sidebar .user .my_points").css('background', '#000').find('.scoreboard').css('background', 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', .7)');
        }
    }

    $(".custom-logo").load(function () {
        $(this).css('opacity', '1');
    });
}

function search_all() {
    var me = get_me();
    me = me.usertype_id;
    var $input = $('#search-ul'),
        $ulresult = $("[data-id='" + $input.attr('id') + "']"),
        value = '',
        minlen = 3,
        xhr;

    $input.on('keyup', function () {
        value = $input.val();

        var chats = null,
            $chat = $ulresult.find('.li-chat'),
            outputchat = '',
            help = null,
            $help = $ulresult.find('.li-help'),
            outputhelp = '',
            users = null,
            $user = $ulresult.find('.li-profile'),
            outputuser = '',
            pins = null,
            $pin = $ulresult.find('.li-pins'),
            outputpin = '',
            files = null,
            $file = $ulresult.find('.li-files'),
            outputfile = '',
            post = null,
            $post = $ulresult.find('.li-post'),
            outputpost = '',
            showresults = false;

        if (xhr && xhr.readyState != 4 && xhr.readyState != 0) xhr.abort();

        if (value.length >= minlen) {

            $input.parent('.load-search').addClass('searching');
            $ulresult.hide();
            $chat.hide();
            $help.hide();
            $user.hide();
            $pin.hide();
            $file.hide();
            $post.hide();

            $ulresult.find(".no-results").html('');

            xhr = $.ajax({
                url: 'ws/search/get',
                data: {q: value},
                method: 'POST',
                success: function (data) {
                    chats = data.chatinfo;

                    if (chats && Object.keys(chats).length > 0) {

                        get_template($chat.find('.chatlist'));

                        $chat.find('.chatlist').html('');

                        for (i in chats) {
                            chats[i].fa_icon = chats[i].private == 1 ? 'fa-lock' : 'fa-hashtag';
                            chats[i].url = './channel/' + chats[i].id + '/' + chats[i].name_sanitized;
                            outputchat += fill_template($chat.find('.chatlist'), chats[i]);
                        }

                        $chat.find('.chatlist').html(outputchat);
                        $chat.show();

                        showresults = true;
                    }

                    help = data.help;

                    if (help && Object.keys(help).length > 0) {

                        get_template($help.find('.helplist'));

                        $chat.find('.helplist').html('');

                        for (i in help) {
                            outputhelp += fill_template($help.find('.helplist'), help[i]);
                        }

                        $help.find('.helplist').html(outputhelp);
                        $help.show();

                        showresults = true;
                    }


                    users = data.user;

                    if (users && Object.keys(users).length > 0) {

                        get_template($user.find('.userlist'));

                        $user.find('.userlist').html('');

                        for (i in users) {
                            users[i].url = './message/' + users[i].username;
                            outputuser += fill_template($user.find('.userlist'), users[i]);
                        }

                        $user.find('.userlist').html(outputuser);
                        $user.show();

                        showresults = true;
                    }

                    pins = data.favorite;

                    if (pins && Object.keys(pins).length > 0) {

                        /*get_template($pin.find('.pinlist'));

                         $pin.find('.pinlist').html('');*/

                        for (i in pins) {
                            var template_name = 'template-' + pins[i].target;
                            var hour = pins[i].hour.split(':');
                            pins[i].hour = hour[0] + ":" + hour[1];

                            if (pins[i].target == 'chat') {
                                pins[i].user_img = pins[i].detail.user_img;
                                pins[i].user_name = pins[i].detail.user_name;
                                pins[i].text = pins[i].detail.text;
                                pins[i].target_name = "Canal - " + pins[i].detail.info.name;
                            }
                            /*else {
                             pins[i].text = pins[i].text.replace(/(\b)([a-zA-Z])/g,
                             function (firstLetter) {
                             return firstLetter.toUpperCase();
                             });
                             pins[i].text = pins[i].text.replace(' ', '');
                             }*/

                            outputpin += fill_template($pin.find('.pinlist'), pins[i], template_name);
                        }

                        $pin.find('.pinlist').html(outputpin);
                        $pin.show();

                        showresults = true;
                    }

                    files = data.file;

                    if (files && files.length > 0) {

                        get_template($file.find('.filelist'));

                        $file.find('.filelist').html('');

                        for (i in files) {
                            files[i].date = (files[i].date) ? files[i].date : '';
                            var hour = (files[i].hour) ? files[i].hour.split(':') : ['', ''];
                            files[i].hour = hour[0] + ":" + hour[1];

                            var size = files[i].size.split(' ');

                            size[0] = Math.round(size[0]);

                            files[i].size = size[0] + " " + size[1];

                            files[i].name_img = "<b>" + files[i].name + "</b>";
                            //files[i].name_img = (files[i].format == 'image') ? '<img src="' + files[i].src + '" alt="' + files[i].name + '" class="img-responsive img-rounded">' : "<b>" + files[i].name + "</b>";
                            outputfile += fill_template($file.find('.filelist'), files[i]);
                        }

                        $file.find('.filelist').html(outputfile);
                        $file.show();

                        showresults = true;
                    }

                    post = data.post;

                    if (post && post.length > 0) {

                        get_template($post.find('.postlist'));

                        $post.find('.postlist').html('');

                        for (i in post) {

                            post[i].url = './feed/' + post[i].id + '/' + post[i].title_sanitized;
                            var hour = (post[i].hour) ? post[i].hour.split(':') : ['', ''];
                            post[i].hour = hour[0] + ":" + hour[1];
                            post[i].edit_link = './adm/post/alterar/' + post[i].id;

                            outputpost += fill_template($post.find('.postlist'), post[i]);
                        }

                        $post.find('.postlist').html(outputpost);
                        $post.show();

                        showresults = true;
                    }


                    $input.parent().removeClass('searching');

                    $ulresult.show(0, function () {

                        var top_this = $(this).offset().top,
                            window_h = $(window).height(),
                            new_h = (window_h - top_this),
                            new_h = new_h - (new_h / 20);

                        $ulresult.css({'max-height': new_h + 'px'});
                    });

                    if (!showresults) {
                        $ulresult.find(".no-results").html('<h4>Nada encontrado.</h4>');
                    }
                }
            });
        } else {
            $input.parent('.load-search').removeClass('searching');
            $ulresult.hide();
            $chat.hide();
            $help.hide();
            $user.hide();
            $pin.hide();
            $file.hide();
        }
    });

    $input.click(function () {
        $input.keyup();
    });

    $(document).mouseup(function (e) {

        if (!$input.is(e.target) && $input.has(e.target).length === 0 && !$ulresult.is(e.target) && $ulresult.has(e.target).length === 0) {
            $ulresult.hide();
            $input.val('');
        }
    });

}

function get_list_open($element) {
    if ($element.length > 0) {
        var id = me('id'),
            for_label = $element.attr('for'),
            sess_id = for_label + '-' + id;

        if ($element && $element != undefined) {
            var check = $.parseJSON(localStorage.getItem(sess_id)),
                $input = $("#" + $element.attr('for'));

            $input.click(function () {
                var checked = $(this).is(":checked");

                $element.removeClass('closed-' + !checked);
                $element.addClass('closed-' + checked);

                localStorage.setItem(sess_id, checked);
            });


            $input.prop('checked', check);
            $element.addClass('closed-' + check);
        }
    }
}

function form_profile() {

    var window_h = $(window).height(),
        header_h = $("header").height(),
        menu_h = window_h - header_h,
        corrige = 40,
        top_menu_h = ($(".menu-resize .img-user").height() + $(".menu-resize .user").height());

    $(".update-profile").css({'top': '-' + corrige + 'px'});

    $(".form-profile").css({'padding-top': corrige + 'px'});

    $(".form-profile form").css({'height': ((menu_h - top_menu_h) - corrige) + 'px'});

    $(".update-profile .close-profile").css('top', '-' + (top_menu_h - (corrige + 10)) + 'px');

    $(".update-profile .close-profile").click(function () {
        $(".update-profile").removeClass('open');
        return false;
    });

    profile_image();

    $(".img-user img").on('click', function () {
        var me_user = me();

        $("#profile-name").val(me_user.name);
        $("#profile-lastname").val(me_user.lastname);
        $("#profile-username").val(me_user.username);
        $("#profile-email").val(me_user.email);
        $("#profile-place").val(me_user.place);
        $("#profile-cell").val(me_user.cell);
        $("#profile-position").val(me_user.position);
        $("#profile-score").val(me_user.score);
        $("#profile-level").val(me_user.level);
        $("#profile-phone").val(me_user.phone);
        $("#profile-branch").val(me_user.branch);
        $("#profile-cellphone").val(me_user.cellphone);
        $("#profile-description").val(me_user.description);

        $.get('./ws/userstatus/get/all', function (data) {
            var userstatus_id = me_user.userstatus_id,
                $profile_status = $("#profile-status"),
                output = '';

            for (i in data) {
                output += fill_template($profile_status, data[i]);
            }

            $profile_status.html(output);

            $profile_status.val(userstatus_id).change();

        });

        $.get('./ws/customfield/get/all', function (data) {
            var me_user = me(),
                userfield = me_user.userfield,
                $custom_field = $(".custom-field-profile"),
                output = '',
                userfield_value = [];

            for (i in userfield) {
                userfield_value[userfield[i].customfield_id] = userfield[i].value;
            }

            for (i in data.customfield) {

                data.customfield[i].value = (userfield_value[data.customfield[i].id]) ? userfield_value[data.customfield[i].id] : '';

                //output += fill_template($custom_field, data.customfield[i]);
            }

            $custom_field.html(output);

        });


        $(".update-profile").addClass('open');

        return false;
    });
    $('.resize-image').attr("src", me().img);

    $("#profile-username").keyup(function () {
        $(this).val($(this).val().replace(/[^\.a-z0-9_-]/g, ''))
    });

    $(".update-profile .form-profile form").submit(function () {
        //alert(JSON.stringify($(this)));

        $('.now_loading').css("display", "block");
            var data_form = new FormData(this),
                password = $("#profile-password").val(),
                password_confirm = $("#profile-password-confirm").val(),
                password_status = true;
            var crop = $(".form-profile #profile-image").val();
            var ext = crop.substring(crop.length - 3);

            if (password != '' || password_confirm != '') {
                if (password != password_confirm) {
                    password_status = false;
                }
            }

            var extension = $("#profile-image").val().split('.').pop().toUpperCase();
        if (!password_status) {
                var error = {error: ['Senhas não coincidem!']};

                $('.now_loading').css("display", "none");

                alert_box(error);

                $(".form-profile #profile-password").focus();

            } else {
                $.ajax({
                    url: 'ws/user/update',
                    data: data_form,
                    dataType: 'json',
                    processData: false,
                    type: 'POST',
                    contentType: false,
                    mimeType: 'multipart/form-data',
                    success: function (data) {
                        if (data.error) {
                            alert_box(data);
                            $('.now_loading').css("display", "none");
                        } else {
                                localMsg({msg: "Perfil atualizado com sucesso."});
                                remove_me();
                        }
                    },
                    error: function (e) {
                        alert(JSON.stringify(e));
                    }
                });
            }

            return false;
        }
    );
}


function profile_image() {
    $(".update-profile .form-profile #send-profile-image").click(function () {
        $(".update-profile .form-profile form .form-group.profile-image input").click();
    });

    $(".update-profile .form-profile form .form-group.profile-image input").change(function () {
        var file = $(this).val(),
            file_name = file.split('\\');

        file_name = file_name.pop();

        file_name = (file_name != '') ? '<span>' + file_name + '</span><input type="hidden" name="type-image-profile" id="custom-avatar-save" value="image">' : '';

        $(".update-profile .form-profile form .form-group.profile-image .temp-profile-image").html(file_name);
    });

    $(".update-profile .form-profile #avatar-profile-image").click(function () {
        $("#modal-avatar-profile").modal('show');
        $.get('./ws/useravatar/get', function (data) {
            var $avatar_list = $("#modal-avatar-profile .modal-body ul"),
                output = '';

            for (i in data.useravatar) {
                output += fill_template($avatar_list, data.useravatar[i]);
            }

            $avatar_list.html(output);

            $avatar_list.find('a').click(function () {
                var useravatar_id = $(this).attr('href').replace('#', ''),
                    img = $(this).find('img').attr('src');

                $(".update-profile .form-profile form .form-group.profile-image .temp-profile-image").html('<span><img src="' + img + '"></span><input type="hidden" name="type-image-profile" value="avatar">');

                $(".update-profile .form-profile form .form-group.profile-image #useravatar_id").val(useravatar_id);

                $("#modal-avatar-profile").modal('hide');

                return false;
            });

        })
    });

}

function form_invite() {

    var $modalinvite = $("#modal-invites"),
        $form = $("form", $modalinvite),
        input = $('.more_friends').html();

    $('.label_more_friends').click(function () {
        $('.more_friends', $modalinvite).append(input);
        $('.more_friends input:last-child', $modalinvite).focus().addClass('plus');
    });

    $('.invites a').click(function () {
        load_groups();

        $modalinvite.modal('show').on('shown.bs.modal', function () {
            $('.more_friends .plus', $modalinvite).remove();
            $('.more_friends input', $modalinvite).val('').focus();

        });

        return false;
    });

    $form.submit(function () {

        var datastring = $(this).serialize();

        $.post('ws/user/invite', datastring,
            function (data) {
                if (data.error) {
                    alert_box(data.error);
                } else {
                    $modalinvite.modal('hide');
                    $('.more_friends .plus', $modalinvite).remove();
                }
            });

        return false;
    });
}
function form_beebot() {
    var $modalbeebot = $('#modal-beebot'),
        $form = $('#beebotSave');

    $('.open-beebot-modal').click(function (event) {
        event.preventDefault();

        $modalbeebot.modal('show').on('shown.bs.modal', function () {
            $('.beebot-question').focus();
        }).on('hidden.bs.modal', function () {
            $modalbeebot.find("input.beebot-question, input.beebot-answer").val('');
        });

        return false;
    });

    $form.on('submit', function (event) {
        event.preventDefault();

        var data = $form.serializeArray();

        $.post('ws/beebot/save',
            data,
            function (data) {
                if (data.error) {
                    alert_box(data.error);
                } else {
                    $modalbeebot.modal('hide');
                    alertMsg(data.msg)
                }
            });
    });
}

function beebot_click(permission) {
    var x = arguments.length > 0 ? arguments[0] : false;
    if (x) {
        $('.open-beebot-modal').click();
    }
}

function clean_notifications(notification_localStorage_id) {
    localStorage.removeItem(notification_localStorage_id);
}

function notifications(notification, notification_localStorage_id) {

    var notification_list = [],
        notification_localStorage_id = notification_localStorage_id,
        notification_list_get = localStorage.getItem(notification_localStorage_id);

    notification_list_get = (notification_list_get) ? $.parseJSON(notification_list_get) : [];

    document.addEventListener('DOMContentLoaded', function () {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    });

    if (notification && notification.length > 0) {

        for (i in notification) {
            var notify = notification[i];

            if ($.inArray(notify.id, notification_list_get) == -1) {

                notify_browser(notify);

                notification_list.splice(1, 0, notify.id);
            }
        }

        localStorage.setItem(notification_localStorage_id, JSON.stringify($.merge(notification_list_get, notification_list)));
    }
}

function notify_browser(notify) {

    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        var notification = new Notification(notify.title, {
            icon: (notify.icon && notify.icon != undefined) ? notify.icon : 'assets/img/notification.jpg',
            body: notify.text
        });

        if (notify.link && notify.link != undefined) {
            notification.onclick = function (e) {
                window.focus();
                window.location.href = notify.link;
            };
        }

        notification_sound();
    }
}

function notification_sound() {

    if ($("#notification-sound").length < 1) {
        $('<audio id="notification-sound">' +
            '<source src="./assets/song/trick.ogg" type="audio/ogg">' +
            '<source src="./assets/song/trick.mp3" type="audio/mpeg">' +
            '</audio>').appendTo('body');
    }

    $('#notification-sound')[0].play();
}


function notify_dm_user(user) {
    var localStorage_id = 'n_dm_' + user.username,
        localStorage_item = localStorage.getItem(localStorage_id);

    if (localStorage_item == undefined || localStorage_item != user.unread) {

        var notify = {
            icon: user.img,
            title: 'Você tem novas mensagens!',
            text: user.name + ' ' + user.lastname + ' te enviou ' + user.unread + ' ' + ((user.unread > 1) ? ' novas mensagens.' : ' nova mensagem.'),
            link: $('base').attr('href') + 'message/' + user.username
        };

        notify_browser(notify);

        localStorage.setItem(localStorage_id, user.unread);
    }
}

function notify_chat(chat) {

    var localStorage_id = 'n_chat_' + chat.id,
        localStorage_item = localStorage.getItem(localStorage_id);

    if (localStorage_item == undefined || localStorage_item != chat.unread) {

        var notify = {
            title: 'Você tem novas mensagens!',
            text: 'Você tem ' + chat.unread + ' ' + ((chat.unread > 1) ? ' novas mensagens ' : ' nova mensagem ') + ' no Canal ' + chat.name,
            link: $('base').attr('href') + 'channel/' + chat.id + '/' + chat.name_sanitized
        };

        notify_browser(notify);

        localStorage.setItem(localStorage_id, chat.unread);
    }
}

function quiz_amount(update, in_page_quiz) {
    var quiz_amount_sess = localStorage.getItem('quiz_amount'),
        quiz_amount_date = localStorage.getItem('quiz_amount_date'),
        date_now = new Date(),
        $quiz_amount_top = $(".header .navbar-right #quiz-amount"),
        $quiz_amount_page = $(".quiz .quiz-count"),
        quiz_amount_page_text = (quiz_amount_sess > 0) ? quiz_amount_sess + " Quiz não respondidos" : "Todas as perguntas foram respondidas.";

    quiz_amount_page_text = (quiz_amount_sess == 1) ? quiz_amount_sess + " Quiz não respondido" : quiz_amount_page_text;

    quiz_amount_date = (quiz_amount_date) ? new Date(quiz_amount_date) : null;

    if (!update && (!quiz_amount_date || date_now > quiz_amount_date)) {
        quiz_amount(true, in_page_quiz);
    } else {
        if (!update) {
            if (quiz_amount_sess != null) {
                if (quiz_amount_sess > 0) {
                    $quiz_amount_top.text(quiz_amount_sess).removeClass('hide');

                    if (in_page_quiz) {
                        $quiz_amount_page.text(quiz_amount_page_text);
                    }

                } else {

                    $quiz_amount_top.text(quiz_amount_sess).addClass('hide');

                    if (in_page_quiz) {
                        $quiz_amount_page.text(quiz_amount_page_text);
                    }
                }
            } else {
                quiz_amount(true, in_page_quiz);
            }
        } else {
            $.post('ws/quiz/get', function (data) {
                var quiz = data.quiz,
                    unanswered = 0,
                    now = new Date(),
                    hour = 2;

                now.setHours(now.getHours() + hour);

                for (i in quiz) {
                    if (!quiz[i].answered) unanswered = unanswered + 1;
                }

                localStorage.setItem('quiz_amount', unanswered);

                localStorage.setItem('quiz_amount_date', now);

                quiz_amount(false, in_page_quiz);

            });
        }
    }

}
function quiz_amount_ajax() {
    $.post('ws/quiz/get', function (data) {
        var quiz = data.quiz,
            unanswered = 0,
            i,
            $quiz_amount_top = $(".header .navbar-right #quiz-amount"),
            $quiz_amount_page = $(".quiz .quiz-count");
        for (i in quiz) {
            var item = quiz[i];
            if (!item.answered) {
                unanswered = unanswered + 1;
            }
        }
        localStorage.setItem('quiz_amount', unanswered);
        var quiz_amount_page_text = (unanswered > 0) ? unanswered + " Quiz não respondidos" : "Todas as perguntas foram respondidas.";
        if (unanswered > 0) {
            $quiz_amount_top.text(unanswered).removeClass('hide');
        } else {
            $quiz_amount_top.text(unanswered).addClass('hide');
        }
        $quiz_amount_page.text(quiz_amount_page_text);
    });
}
function load_groups() {
    $.post('ws/group/get',
        function (data) {
            if (data.error) {
                alert_box(data);
                return false;
            }
            else {
                sent_group(data);
            }
        });
}
function sent_group(data) {
    var $select = $('#group-invite');
    list_group_chosen($select, data);
    $select.css({
        'position': 'absolute',
        'width': '95%',
        'opacity': 0,
        'display': 'block'
    });
}


function list_group_chosen($item, data) {
    var output = '';

    get_template($item);

    $item.html('');

    for (i in data) {
        output += fill_template($item, data[i]);
    }

    output = "<option value="
    "></option>" + output;

    $item.append(output).val('').change();

    if ($item.hasClass('chosen-active')) {
        $item.trigger("chosen:updated");
    } else {
        $item.chosen({
            no_results_text: "Oops, usuário não encontrado!"
        }).addClass('chosen-active');
    }

}

function getHexColor(color) {
    if (color.indexOf('#') != -1) return color;

    color = color
        .replace("rgba", "")
        .replace("rgb", "")
        .replace("(", "")
        .replace(")", "");
    color = color.split(",");

    return "#"
        + ( '0' + parseInt(color[0], 10).toString(16) ).slice(-2)
        + ( '0' + parseInt(color[1], 10).toString(16) ).slice(-2)
        + ( '0' + parseInt(color[2], 10).toString(16) ).slice(-2);
}

function modal_confirm(text_html, href, func) {
    var $modal = $('#modal-confirm'),
        text_html = text_html != undefined ? text_html : '',
        href = (href != undefined && href != '' && href != false) ? href : false,
        func = (func != undefined && func != '' && !href) ? func : false;


    $modal.modal('show');

    $modal.find('.modal-body').html(text_html);

    $modal.find('.confirm').removeAttr('onclick');

    if (href || func) {
        var onclick = (href) ? "window.location = '" + href + "'" : func;

        $modal.find('.confirm').attr('onclick', onclick + ";return false;");
    }

    return false;
}

function modal_confirm_return(text_html, href, func) {
    var $modal = $('#modal-confirm'),
        text_html = text_html != undefined ? text_html : '',
        href = (href != undefined && href != '' && href != false) ? href : false,
        func = (func != undefined && func != '' && !href) ? func : false;


    $modal.modal('show');

    $modal.find('.modal-body').html(text_html);

    $modal.find('.confirm').removeAttr('onclick');

    $modal.find('.btn-gray').addClass('cancel');

    return $modal.find('.confirm');

}

function action_form_submit(form_id, action) {
    $(form_id).attr('action', action).submit();
}

function action_form(form_id) {
    var $form = $(form_id),
        $btn = $form.find(".btn-action-form"),
        $select = $form.find(".select-action-form");

    $btn.click(function () {
        var numberOfChecked = $('input[name="id[]"]:checked').length;
        var action = $(this).data('action'),
            confirm_text = $(this).data('confirm');
        if (numberOfChecked > 0) {
            confirm_text = confirm_text.replace("%", numberOfChecked);
        } else {
            confirm_text = 'Nenhum item foi selecionado deseja continuar?';
        }
        if (confirm_text != undefined) {
            modal_confirm(confirm_text, false, 'action_form_submit(\'' + form_id + '\', \'' + action + '\')');
        } else {
            $form.attr('action', action).submit();
        }

    });

    $select.change(function () {
        var numberOfChecked = $('input[name="id[]"]:checked').length;
        var action = $(this).val(),
            confirm_text = $(this).data('confirm');
        if (numberOfChecked > 0) {
            confirm_text = confirm_text.replace("%", numberOfChecked);
        } else {
            confirm_text = 'Nenhum item foi selecionado deseja continuar?';
        }
        if (confirm_text != undefined) {
            modal_confirm(confirm_text, false, 'action_form_submit(\'' + form_id + '\', \'' + action + '\')');
        } else {
            $form.attr('action', action).submit();
        }

    });
}
function action_form_filter(form_id) {
    var $form = $(form_id),
        $btn = $form.find(".btn-action-form-filter");
    $btn.click(function () {
        if ($(this).is(':checked')) {
            $('input[name=status]').val("1");
            $form.submit();
        } else {
            $('input[name=status]').val("0");
            $form.submit();
        }
    });
}

function findLocalItems(query) {
    var i, results = [];
    for (i in localStorage) {
        if (localStorage.hasOwnProperty(i)) {
            if (i.match(query) || (!query && typeof i === 'string')) {
                value = JSON.parse(localStorage.getItem(i));
                results.push({key: i, val: value});
            }
        }
    }
    return results;
}
function update_user_level() {
    $.get('ws/level/update_user_level');
}

function page_loading(type) {
    var $page_loading = $(".page_loading");

    if (type != 'show') {
        $page_loading.hide();
    } else {
        $page_loading.show();
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
}
$(function() {
    $('#username').focus(function() {
        var name = $(this).val()
        if(name == '' || name == '请输入姓名') {
            $(this).val('').css('color', '#333333')
        }
    }).blur(function() {
        var name = $(this).val()
        if(name == '' || name == '请输入姓名') {
            $(this).val('请输入姓名').css('color', '#777777')
        }
    })
    $('#phonenumber').focus(function() {
        var phonenumber = $(this).val()
        if(phonenumber == '' || phonenumber == '请输入联系方式' || phonenumber == '请输入正确的联系方式') {
            $(this).val('').css('color', '#333333')
        }
    }).blur(function() {
        var phonenumber = $(this).val()
        if(phonenumber == '' || phonenumber == '请输入联系方式' || phonenumber == '请输入正确的联系方式') {
            $(this).val('请输入联系方式').css('color', '#777777')
        }
    })
    $('#agreement').click(function() {
        if($('#agreement')[0].checked) {
            $('.agreement-alert').hide()
        }
    })
    $('#provice').click(function() {
        $('.provice-list').toggle();
    })
    $('#city').click(function() {
        $('.city-list').toggle();
    })
    $('#distributor').click(function() {
        $('.distributor-list').toggle();
    })
    $('.event-registration').delegate('div ul li', 'click', function() {
        $(this).parent().prev().text($(this).text()).css({
            'font-size': '15px',
            'color': '#333333',
            'font-family': '黑体'
        }).attr('title', $(this).attr('title'));
        $(this).parent().hide();
    })
    $(document).click(function(event) {
        event.stopPropagation();
        var target = event.target || event.srcElement;
        var tagName = target.tagName;
        var ID = target.id;
        if(tagName !== 'LI' &&  ID != 'provice' && ID != 'city' && ID != 'distributor') $('.provice-list, .city-list, .distributor-list').hide();
        switch(ID) {
            case 'provice': $('.city-list, .distributor-list').hide(); break;
            case 'city': $('.provice-list, .distributor-list').hide(); break;
            case 'distributor': $('.provice-list, .city-list').hide(); break;
            default: return;
        }
    })
    $('#submit').click(function() {
        var flag = true;
        var name = $('#username').val();
        var sex = $('input[name="sex"]:checked').val();
        var phonenumber = $('#phonenumber').val();
        var provice = $('#provice').text();
        var city = $('#city').text();
        var distributor = $('#distributor').text();
        if(name == '' || name == '请输入姓名') {
            $('#username').val('请输入姓名').css('color', 'red')
            flag = false;
        }
        if(phonenumber == '' || phonenumber == '请输入联系方式' || phonenumber == '请输入正确的联系方式') {
            $('#phonenumber').val('请输入联系方式').css('color', 'red');
            flag = false;
        }
        if(!/^\d{11}$/.test(phonenumber)) {
            $('#phonenumber').val('请输入正确的联系方式').css('color', 'red');
            flag = false;
        }
        if(provice == '请选择省份') {
            $('#provice').css('color', 'red')
            flag = false;
        }
        if(city == '请选择城市') {
            $('#city').css('color', 'red')
            flag = false;
        }
        if(distributor == '请选择意向经销商') {
            $('#distributor').css('color', 'red')
            flag = false;
        }
        if(!$('#agreement')[0].checked) {
            flag = false;
            $('.agreement-alert').show()
        }
        if(flag) {
            $.ajax({
                url: '',
                type: 'POST',
                data: {
                    name: name,
                    sex: sex,
                    phonenumber: phonenumber,
                    provice: provice,
                    city: city,
                    distributor: distributor
                },
                success: function(res) {
                    if(res) {
                        alert('提交成功！')
                        location.href="http://www.****.com"
                    }
                }
            })
        }
    })
})
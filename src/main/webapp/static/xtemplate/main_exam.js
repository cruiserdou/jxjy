/**
 * Created by xwq on 14-5-2.
 */
var sel_exam_Tpl = [
    '<div class="examing_wrap">',
    '<form id="examing_form" action="obtain_orders_info" method="post">',
    '<h2>信息核查</h2>' +
        //'<a href="javascript:self.print();">打印该页 </a>',
    '<hr><br/><br/>',
    '<div id="base_info">',
    '<table>',
    '<tr>',
    '<th>姓名:</th>',
    '<td>{name}</td>',
    '</tr>',
    '<tr>',
    '<th>性别:</th>',
    '<td>{sex}</td>',
    '</tr>',
    '<tr>',
    '<th>身份证号:</th>',
    '<td id="id_card">{card}</td>',
    '</tr>',
    '<tr>',
    '<th>工作单位或家庭住址:</th>',
    '<td>{address}</td>',
    '</tr>',
    '<tr>',
    '<th>原从业资格证件号:</th>',
    '<td>{lictype}</td>',
    '</tr>',
    //'<tr>',
    //'<th>驾照初始日期:</th>',
    //'<td>{licdt}</td>',
    //'</tr>',
    //'<tr>',
    //'<th>资格类别:</th>',
    //'<td>{licmd}</td>',
    //'</tr>',
    '<tr>',
    '<th>考生状态:</th>',
    '<td>{ks_status}</td>',
    '</tr>',
    '</table>',
    '<a onclick="examinees_start(\'{status}\');" id="start_btn" href="#">开始考试</a>' +
    '<span id="exam_status_span" style="color: red;">正在初始化考试系统，请等候...</span>',
    '</div>',
    '<div id="img">',
    '<img src="static/upload/{photo}"/>',
    '</div>',
    '</div>'
];

var login_exam_Tpl = [
    '<div id="login_form">',
    '<form >',
    '<table id="login_table">',
    '<tr>',
    '<td colspan="2">资格考试1</td>',
    '</tr>',
    '<tr>',
    '<td class="td_head">身份证号：</td>',
    '<td><input type="text" name="id"/></td>',
    '</tr>',
    '<tr>',
    '<td class="td_head">姓名：</td>',
    '<td><input type="text" name="id"/></td>',
    '</tr>',
    '<tr>',
    '<td class="td_head">密码：</td>',
    '<td><input type="password" name="id"/></td>',
    '</tr>',
    '</table>',
    '</form>',
    '</div>'
];

function examinees_start(status) {
    if(status=="违纪"){
        swal({
            title: "信息提示",
            text: "您存在违纪行为！",
            type: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK ",
            closeOnConfirm: false
        }, function (isConfirm) {
            if (isConfirm) {
                document.location.href="https://www.wwyg.com:8443/jxjy/";
            }else{
                document.location.href="https://www.wwyg.com:8443/jxjy/";
            }
        });
    }else {
        console.log(opt_flag);
        if (opt_flag == false && check_sckt_flag == false && check_yk_flag == false) {
            swal("还未到考试时间，请等待...");
            return
        }
        if (opt_flag == true && check_sckt_flag == true) {
            swal("正在生成考题，请等待...");
            return
        }
        if (opt_flag == true && check_yk_flag == true) {
            swal("你已提交成绩，不能再次考试！");
            return
        }

        //重新设置标志防止重新点击
        opt_flag = false;

        Ext.Ajax.request({
            method: "POST",
            url: 'obtain_exam_next_info',
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    check_sckt_flag = true;
                    document.location.href = "examed";
                } else {
                    check_yk_flag = true;
                    swal({
                        title: "信息提示",
                        text: "您已提交成绩，无法再次考试！",
                        type: "warning",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK ",
                        closeOnConfirm: false
                    }, function (isConfirm) {
                        if (isConfirm) {
                            document.location.href = "https://www.wwyg.com:8443/jxjy/";
                        } else {
                            document.location.href = "https://www.wwyg.com:8443/jxjy/";
                        }
                    });
                }
            },
            failure: function () {
                swal("联系系统管理员，检查考生状态！");
            }
        });
    }
}
function examinees_starts() {

    var windowExt = Ext.create('Ext.window.Window', {
        title: '照片上传',
        width: 600,
        height: 360,
        modal: true,
        draggable: false,
        resizable: false,
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'panel',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [
                            {
                                flex: 1,
                                html: '<video style="width: 100%;" id="user-media" autoplay></video>'
                            }
                            ,
                            {
                                flex: 1,
                                html: '<canvas id="canvas1" style="width: 290px;"></canvas>'
                            }
                        ]
                    },
                    {
                        height: 98,
                        xtype: 'panel',
                        html: '<button id="photo-btn" onclick="photoImg();">拍照</button>' +
                        '<button id="save-btn" onclick="uploadPhoto();">保存</button>'
                    }
                ]
            }
        ]
    });
    //windowExt.show(Ext.get('start_btn'));

    var num = 0;
    var b_start = 0;
    // Do the vendor prefix dance
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;

    // Set up an error handler on the callback
    var errCallback = function (e) {
        console.log('Did you just reject me?!', e);
    };

    // Request the user's media
    function requestMedia() {
        //e.preventDefault();

        // Use the vendor prefixed getUserMedia we set up above and request just video
        navigator.getUserMedia({video: true, audio: false}, showMedia, errCallback);
    };

    var localStream;
    // Actually show the media
    function showMedia(stream) {
        var video = document.getElementById('user-media');
        video.src = window.URL.createObjectURL(stream);

        //localStream.stop()可以关闭调用的摄像头 然后设置localStream = null
        localStream = stream;
        video.onloadedmetadata = function (e) {
            console.log('Locked and loaded.');
        };
    };

    requestMedia();
};

function photoImg() {
    var videoElement = document.getElementById('user-media');
    var canvasObj = document.getElementById('canvas1');
    var context1 = canvasObj.getContext('2d');
    context1.fillStyle = "#ffffff";
    context1.fillRect(0, 0, 290, 217);
    context1.drawImage(videoElement, 0, 0, 290, 217);
}

function uploadPhoto()//上传拍照的图片
{
    var imgstr = document.getElementById('canvas1').toDataURL();
    imgstr = encodeURIComponent(imgstr);

    $.ajax({
        type: "POST",
        url: "upload_phote",
        data: {
            "img": imgstr,
            "id_card": document.getElementById('id_card').innerText,
            "num": '1'
        },
        success: function (msg) {

        }
    });
}

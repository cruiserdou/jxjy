/**
 * Created by xwq on 14-5-2.
 */
var sel_exam_Tpl = [
    '<div class="examed_wrap">',
    '<form id="examed_form" action="add_answers_info" method="post">',
    '<div id="timer" style="color:red;font-size:16px"></div>',
    '<h2>选择题</h2>',
    '<hr><br/><br/>',

    '<div>',
    '<ol>',
    '<tpl for="list">',
    '<li class="question_xwq">',
    '{question_xwq}',
    '<ol class="answer">',
    '<li type="A"><input name="{qtnum}"  type="radio" value="A"/>{qt_a}</li>',
    '<li type="A"><input name="{qtnum}"  type="radio" value="B"/>{qt_b}</li>',
    '<li type="A"><input name="{qtnum}"  type="radio" value="C"/>{qt_c}</li>',
    '<li type="A"><input name="{qtnum}"  type="radio" value="D"/>{qt_d}</li>',
    '</ol>',
    '</li>',
    '</tpl>',
    '</ol>',

    '<a onclick="obt_answers_insert(\'{card}\',\'{qtbh}\');"  id="start_btn">交卷</a>',

    '</form>',
'</div>'
];

//考生信息
function obt_answers_insert(card,qtbh) {

    var form_obt_answers = document.getElementById("examed_form");
    var result='';

    for ( i = 0; i < 100; i++){
        var b_check=false;
        for(j=4*i; j<4+4*i; j++) {
            if (form_obt_answers[j].checked == true) {
                result = result + i + ',' + form_obt_answers[j].value + ','
                b_check =true;
                break;
            }
            else{
                b_check =false;
            }
            if(b_check ==false &&  j==4*i+3){
                result = result + i + ',' + 'X' + ','
            }
        }
    }

    Ext.Ajax.request({
        method: "POST",
        params: {
            admbh: card,
            qtbh:qtbh,
//            qtbh: form_obt_answers['qtbh'].value,
            qtnum: 1,
            answer: result
        },
        url: 'add_answers_info',
        success: function () {

            document.location.href="score_query";


        },
        failure: function () {
           Ext.Msg.alert("提示", "保存失败！");
        }
    });
}

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



//var maxtime = 3600 //半个小时，按秒计算，自己调整!
//function CountDown(){
//    if(maxtime>=0){
//        minutes = Math.floor(maxtime/60);
//        seconds = Math.floor(maxtime%60);
//        msg = "距离结束:"+minutes+"分"+seconds+"秒";
//        document.all["timer"].innerHTML=msg;
//        if(maxtime == 5*60) alert('注意，还有5分钟!');
//        --maxtime;
//    }
//    else{
//        clearInterval(timer);
//        alert("时间到，考试结束!");
//        obt_answers_insert('{card}','{qtbh}');
//    }
//}
//timer = setInterval("CountDown()",1000);

var e_status_tpl =  [
    '<fieldset>' +
    '<span>' +
    '<span><a id="e_status_a_1" href="#" onclick="changeQuest(1);">1</a></span></td>' +
    '<span><a id="e_status_a_2" href="#" onclick="changeQuest(2);">2</a></span>' +
    '<span><a id="e_status_a_3" href="#" onclick="changeQuest(3);">3</a></span>' +
    '<span><a id="e_status_a_4" href="#" onclick="changeQuest(4);">4</a></span>' +
    '<span><a id="e_status_a_5" href="#" onclick="changeQuest(5);">5</a></span>' +
    '<span><a id="e_status_a_6" href="#" onclick="changeQuest(6);">6</a></span>' +
    '<span><a id="e_status_a_7" href="#" onclick="changeQuest(7);">7</a></span>' +
    '<span><a id="e_status_a_8" href="#" onclick="changeQuest(8);">8</a></span>' +
    '<span><a id="e_status_a_9" href="#" onclick="changeQuest(9);">9</a></span>' +
    '<span><a id="e_status_a_10" href="#" onclick="changeQuest(10);">10</a></span>' +
    '</span>' +
    '<span>' +
    '<span><a id="e_status_a_11" href="#" onclick="changeQuest(11);">11</a></span>' +
    '<span><a id="e_status_a_12" href="#" onclick="changeQuest(12);">12</a></span>' +
    '<span><a id="e_status_a_13" href="#" onclick="changeQuest(13);">13</a></span>' +
    '<span><a id="e_status_a_14" href="#" onclick="changeQuest(14);">14</a></span>' +
    '<span><a id="e_status_a_15" href="#" onclick="changeQuest(15);">15</a></span>' +
    '<span><a id="e_status_a_16" href="#" onclick="changeQuest(16);">16</a></span>' +
    '<span><a id="e_status_a_17" href="#" onclick="changeQuest(17);">17</a></span>' +
    '<span><a id="e_status_a_18" href="#" onclick="changeQuest(18);">18</a></span>' +
    '<span><a id="e_status_a_19" href="#" onclick="changeQuest(19);">19</a></span>' +
    '<span><a id="e_status_a_20" href="#" onclick="changeQuest(20);">20</a></span>' +
    '</span>' +
    '<span>' +
    '<span><a id="e_status_a_21" href="#" onclick="changeQuest(21);">21</a></span>' +
    '<span><a id="e_status_a_22" href="#" onclick="changeQuest(22);">22</a></span>' +
    '<span><a id="e_status_a_23" href="#" onclick="changeQuest(23);">23</a></span>' +
    '<span><a id="e_status_a_24" href="#" onclick="changeQuest(24);">24</a></span>' +
    '<span><a id="e_status_a_25" href="#" onclick="changeQuest(25);">25</a></span>' +
    '<span><a id="e_status_a_26" href="#" onclick="changeQuest(26);">26</a></span>' +
    '<span><a id="e_status_a_27" href="#" onclick="changeQuest(27);">27</a></span>' +
    '<span><a id="e_status_a_28" href="#" onclick="changeQuest(28);">28</a></span>' +
    '<span><a id="e_status_a_29" href="#" onclick="changeQuest(29);">29</a></span>' +
    '<span><a id="e_status_a_30" href="#" onclick="changeQuest(30);">30</a></span>' +
    '</span>' +
    '<span>' +
    '<span><a id="e_status_a_31" href="#" onclick="changeQuest(31);">31</a></span>' +
    '<span><a id="e_status_a_32" href="#" onclick="changeQuest(32);">32</a></span>' +
    '<span><a id="e_status_a_33" href="#" onclick="changeQuest(33);">33</a></span>' +
    '<span><a id="e_status_a_34" href="#" onclick="changeQuest(34);">34</a></span>' +
    '<span><a id="e_status_a_35" href="#" onclick="changeQuest(35);">35</a></span>' +
    '<span><a id="e_status_a_36" href="#" onclick="changeQuest(36);">36</a></span>' +
    '<span><a id="e_status_a_37" href="#" onclick="changeQuest(37);">37</a></span>' +
    '<span><a id="e_status_a_38" href="#" onclick="changeQuest(38);">38</a></span>' +
    '<span><a id="e_status_a_39" href="#" onclick="changeQuest(39);">39</a></span>' +
    '<span><a id="e_status_a_40" href="#" onclick="changeQuest(40);">40</a></span>' +
    '</span>' +

    '<span>' +
    '<span><a id="e_status_a_41" href="#" onclick="changeQuest(41);">41</a></span>' +
    '<span><a id="e_status_a_42" href="#" onclick="changeQuest(42);">42</a></span>' +
    '<span><a id="e_status_a_43" href="#" onclick="changeQuest(43);">43</a></span>' +
    '<span><a id="e_status_a_44" href="#" onclick="changeQuest(44);">44</a></span>' +
    '<span><a id="e_status_a_45" href="#" onclick="changeQuest(45);">45</a></span>' +
    '<span><a id="e_status_a_46" href="#" onclick="changeQuest(46);">46</a></span>' +
    '<span><a id="e_status_a_47" href="#" onclick="changeQuest(47);">47</a></span>' +
    '<span><a id="e_status_a_48" href="#" onclick="changeQuest(48);">48</a></span>' +
    '<span><a id="e_status_a_49" href="#" onclick="changeQuest(49);">49</a></span>' +
    '<span><a id="e_status_a_50" href="#" onclick="changeQuest(50);">50</a></span>' +
    '</span>' +
    //'<span><a id="e_status_a_51" href="#" onclick="changeQuest(51);">51</a></span>' +
    //'<span><a id="e_status_a_52" href="#" onclick="changeQuest(52);">52</a></span>' +
    //'<span><a id="e_status_a_53" href="#" onclick="changeQuest(53);">53</a></span>' +
    //'<span><a id="e_status_a_54" href="#" onclick="changeQuest(54);">54</a></span>' +
    //'<span><a id="e_status_a_55" href="#" onclick="changeQuest(55);">55</a></span>' +
    //'<span><a id="e_status_a_56" href="#" onclick="changeQuest(56);">56</a></span>' +
    //'<span><a id="e_status_a_57" href="#" onclick="changeQuest(57);">57</a></span>' +
    //'<span><a id="e_status_a_58" href="#" onclick="changeQuest(58);">58</a></span>' +
    //'<span><a id="e_status_a_59" href="#" onclick="changeQuest(59);">59</a></span>' +
    //'<span><a id="e_status_a_60" href="#" onclick="changeQuest(60);">60</a></span>' +
    //'</span>' +
    //
    //'<span>' +
    //'<span><a id="e_status_a_61" href="#" onclick="changeQuest(61);">61</a></span>' +
    //'<span><a id="e_status_a_62" href="#" onclick="changeQuest(62);">62</a></span>' +
    //'<span><a id="e_status_a_63" href="#" onclick="changeQuest(63);">63</a></span>' +
    //'<span><a id="e_status_a_64" href="#" onclick="changeQuest(64);">64</a></span>' +
    //'<span><a id="e_status_a_65" href="#" onclick="changeQuest(65);">65</a></span>' +
    //'<span><a id="e_status_a_66" href="#" onclick="changeQuest(66);">66</a></span>' +
    //'<span><a id="e_status_a_67" href="#" onclick="changeQuest(67);">67</a></span>' +
    //'<span><a id="e_status_a_68" href="#" onclick="changeQuest(68);">68</a></span>' +
    //'<span><a id="e_status_a_69" href="#" onclick="changeQuest(69);">69</a></span>' +
    //'<span><a id="e_status_a_70" href="#" onclick="changeQuest(70);">70</a></span>' +
    //'<span><a id="e_status_a_71" href="#" onclick="changeQuest(71);">71</a></span>' +
    //'<span><a id="e_status_a_72" href="#" onclick="changeQuest(72);">72</a></span>' +
    //'<span><a id="e_status_a_73" href="#" onclick="changeQuest(73);">73</a></span>' +
    //'<span><a id="e_status_a_74" href="#" onclick="changeQuest(74);">74</a></span>' +
    //'<span><a id="e_status_a_75" href="#" onclick="changeQuest(75);">75</a></span>' +
    //'<span><a id="e_status_a_76" href="#" onclick="changeQuest(76);">76</a></span>' +
    //'<span><a id="e_status_a_77" href="#" onclick="changeQuest(77);">77</a></span>' +
    //'<span><a id="e_status_a_78" href="#" onclick="changeQuest(78);">78</a></span>' +
    //'<span><a id="e_status_a_79" href="#" onclick="changeQuest(79);">79</a></span>' +
    //'<span><a id="e_status_a_80" href="#" onclick="changeQuest(80);">80</a></span>' +
    //'</span>' +
    //
    //'<span>' +
    //'<span><a id="e_status_a_81" href="#" onclick="changeQuest(81);">81</a></span>' +
    //'<span><a id="e_status_a_82" href="#" onclick="changeQuest(82);">82</a></span>' +
    //'<span><a id="e_status_a_83" href="#" onclick="changeQuest(83);">83</a></span>' +
    //'<span><a id="e_status_a_84" href="#" onclick="changeQuest(84);">84</a></span>' +
    //'<span><a id="e_status_a_85" href="#" onclick="changeQuest(85);">85</a></span>' +
    //'<span><a id="e_status_a_86" href="#" onclick="changeQuest(86);">86</a></span>' +
    //'<span><a id="e_status_a_87" href="#" onclick="changeQuest(87);">87</a></span>' +
    //'<span><a id="e_status_a_88" href="#" onclick="changeQuest(88);">88</a></span>' +
    //'<span><a id="e_status_a_89" href="#" onclick="changeQuest(89);">89</a></span>' +
    //'<span><a id="e_status_a_90" href="#" onclick="changeQuest(90);">90</a></span>' +
    //'<span><a id="e_status_a_91" href="#" onclick="changeQuest(91);">91</a></span>' +
    //'<span><a id="e_status_a_92" href="#" onclick="changeQuest(92);">92</a></span>' +
    //'<span><a id="e_status_a_93" href="#" onclick="changeQuest(93);">93</a></span>' +
    //'<span><a id="e_status_a_94" href="#" onclick="changeQuest(94);">94</a></span>' +
    //'<span><a id="e_status_a_95" href="#" onclick="changeQuest(95);">95</a></span>' +
    //'<span><a id="e_status_a_96" href="#" onclick="changeQuest(96);">96</a></span>' +
    //'<span><a id="e_status_a_97" href="#" onclick="changeQuest(97);">97</a></span>' +
    //'<span><a id="e_status_a_98" href="#" onclick="changeQuest(98);">98</a></span>' +
    //'<span><a id="e_status_a_99" href="#" onclick="changeQuest(99);">99</a></span>' +
    //'<span><a id="e_status_a_100" href="#" onclick="changeQuest(100);">100</a></span>' +
    //'</span>' +
    '</fieldset>'
];

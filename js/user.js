/*
* 用户模块
* 登录、注册、修改密码、信息填写
* */

//登录
function signInClicked() {
    var username = $("#signin_user").val();
    var password = $("#signin_pwd").val();
    var pattern_phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var strPhone = pattern_phone.test(username);
    if (!strPhone) {
        $("#signin_user").val("");
        $("#signin_pwd").val("");
        //alert("请输入正确的用户名！");
    } else if (password =="") {
        alert("请输入密码！");
    } else {

        $.ajax({
            type:"POST",
            url:"/user/login",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "phone": username,
                "password": password
            }),
            success:function (data) {
                console.log(data)
                if (data.result == true) {
                    //跳转到主页
                    alert("登录成功");
                } else {
                    $("#signin_pwd").val("");
                    alert(data.message);
                }
            }
        });

    }
}

//注册
function signUpClicked() {
    var phone = $("#signup_phone").val();
    var email = $("#signup_email").val();
    var name = $("#signup_name").val();
    var pwd1 = $("#signup_pwd1").val();
    var pwd2 = $("#signup_pwd2").val();
    var pattern_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var pattern_phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var strEmail = pattern_email.test(email);
    var strPhone = pattern_phone.test(phone);
    if (!strPhone) {
        $("#signup_phone").val("");
        alert("请输入正确的用户名！");
    } else if ( !strEmail ) {
        $("#signup_email").val("");
        alert("请输入正确的邮箱！");
    } else if( pwd1 != pwd2 ) {
        $("#signup_pwd1").val("");
        $("#signup_pwd2").val("");
        alert("两次密码输入不一致！");
    } else {
        var signin_url = "/user/sign-up";
        var json_data = {
            "phone": phone,
            "password": pwd1,
            "e-mail": email,
            "name": name
        };
        $.ajax({
            type:'post',
            url:signin_url,
            contentType:'application/json;charset=utf-8',
            data:JSON.stringify(json_data),
            success:function (data) {
                if (data.result == true) {
                    //跳转到信息录入
                    alert("注册成功");
                    window.location.href = "page_personalInfo.html";
                } else {
                    alert(data.message);
                }
            }
        });
    }
}

//修改密码
//api上url写的是/api/user/sign-up   与注册重复了？？？？？？
function updatePwd() {
    var oldPwd = $("#updatepwd_oldpwd").val();
    var newPwd1 = $("#updatepwd_newpwd1").val();
    var newPwd2 = $("#updatepwd_newpwd2").val();
    if ( newPwd1 != newPwd2) {
        $("#updatepwd_newpwd1").val("");
        $("#updatepwd_newpwd2").val("");
        alert("请重复输入新密码！")
    } else {
        var updatePwd_url = "/user/password";
        $.ajax({
            type:'post',
            url:signin_url,
            contentType:'application/json;charset=utf-8',
            data:JSON.stringify({
                "oldPassword": oldPwd,
                "password": newPwd1
            }),
            success: function (data) {
                if (data.result == true) {
                    alert("修改成功");
                } else {
                    alert(data.message);
                }
            }
        });
    }


}

//信息填写，翻页
function nextPage(curr, next) {
    if (next != "end") {
        var flag;
        if (next == 1) {
            flag = infoSubmit_1();
        } else if (next == 2) {
            flag = infoSubmit_2();
        } else if (next == 3) {
            flag = infoSubmit_3();
        } else if (next == 4) {
            flag = infoSubmit_4();
        } else {
            flag = infoSubmit_5();
        }
        if (flag) {
            var currBox = "#box-" + curr;
            var nextBox = "#box-" + next;
            var currTab = "#tab-" + curr;
            var nextTab = "#tab-" + next;
            $(currBox).removeClass("resp-tab-content-visible").addClass("resp-tab-content-invisible");
            $(nextBox).removeClass("resp-tab-content-invisible").addClass("resp-tab-content-visible");
            $(currTab).removeClass("resp-tab-item-active");
            $(nextTab).addClass("resp-tab-item-active");
        }
    } else {
        //完成资料填写后执行的代码块
        if (infoSubmit_6()) {
            alert("完成");
        }
    }
}

//信息填写，提交第一页,非必填项若为空以空串形式
function infoSubmit_1() {
    return true;
    var birthday = $("#birthday").val();
    var gender = $("input[name='gender']:checked").val();
    var jobYear = $("#jobYear").val();
    var salary = $("#salary").val();
    var address = $("#address").val();
    var basicSalary = $("#basicSalary").val();
    var bonus = $("#bonus").val();
    var commission = $("#Commission").val();
    var stockShareOption = $("#stockShareOption").val();
    var submit_data;
    var flag = false;//后台的接收结果,是否可以跳转下一页
    if (birthday == "") {
        alert("请输入您的生日");
    } else if (gender != "male" && gender != "female") {
        alert("请选择您的性别");
    } else if (jobYear == "") {
        alert("请输入您的开始工作年份");
    } else if (salary == "0") {
        alert("请输入您的收入");
    } else if (address =="") {
        alert("请输入您的居住地");
    } else if ( (basicSalary != "" && (isNaN(basicSalary)) || (bonus != "" && isNaN(bonus)) || (commission != "" && isNaN(commission)) ||
            (stockShareOption != "" && isNaN(stockShareOption)))) {
        alert("请将工资福利折价输入")
    } else {
        if (basicSalary != "")
            basicSalary = parseInt(basicSalary);
        else
            basicSalary = 0;
        if (bonus != "")
            bonus = parseInt(bonus);
        else
            bonus = 0;
        if (commission != "")
            commission = parseInt(commission);
        else
            commission = 0;
        if (stockShareOption != "")
            stockShareOption = parseInt(stockShareOption);
        else
            stockShareOption = 0;
        submit_data = {
            "birthday": birthday,
            "gender": gender,
            "jobYear": jobYear,
            "address": address,
            "salary": salary,
            "basicSalary":basicSalary,
            "bonus": bonus,
            "Commission": commission,
            "stockShareOption": stockShareOption
        };
        var url="/api/user/user-message/basicMessage";
        $.ajax({
            type:'post',
            url:url,
            contentType:'application/json;charset=utf-8',
            data:JSON.stringify(submit_data),
            success:function (data) {
                if (data.result == true) {
                    flag = true;
                } else {
                    alert(data.message);
                    flag = false;
                }
            }
        });
    }
    return true;
}

//第二个页面提交
function infoSubmit_2() {
    return true;
    var educationDegree = $("#educationDegree").val();
    var school = $("#school").val();
    var major = $("#major").val();
    var fromTime = $("#fromTime").val();
    var toTime = $("#toTime").val();
    var honor_name = new Array();
    var honor_level = new Array();
    var job_name = new Array();
    var job_level = new Array();
    var submit_data;
    var flag = false;//标记是否后台正常接收可以跳转下一页
    if (educationDegree != "0" && school != "请填写学校全称！" && major != "" && fromTime != "" && toTime !="") {
        $(".honor-name").each(function () {
            honor_name.push($(this).val())
        });
        $(".honor-level").each(function () {
            honor_level.push($(this).val())
        });
        $(".job-name").each(function () {
            job_name.push($(this).val())
        });
        $(".job-level").each(function () {
            job_level.push($(this).val())
        });

        var honor = new Array();
        for (var i = 0; i < honor_name.length; i++) {
            if (honor_name[i] != "" && honor_level[i] != "0") {
                honor.push({
                    "name": honor_name[i],
                    "level": honor_level[i]
                });
            }
        }
        var job = new Array();
        for (var j = 0; j < job_name.length; j++) {
            if (job_name[j] != "" && job_level[j] != "0") {
                job.push({
                    "name": job_name[j],
                    "level": job_level[j]
                });
            }
        }
        submit_data = {
            "educationDegree": educationDegree,
            "school": school,
            "major": major,
            "fromTime": fromTime,
            "toTime": toTime,
            "honor": honor.toJSON,
            "job": job.toJSON
        };
    } else {
        alert("请将必填信息填写完整！");
        return false;
    }

    var url="/api/user/user-message/education";
    $.ajax({
        type:'post',
        url:url,
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(submit_data),
        success:function (data) {
            if (data.result == true) {
                flag = true;
            } else {
                alert(data.message);
                flag = false;
            }
        }
    });
    return true;
}

//第三个页面提交
function infoSubmit_3() {
    return true
    var tag = true;//信息是否填写完整
    var flag = false;//标记，后台是否正常接收，是否可以跳转下一页
    var submit_data = new Array();
    $(".project").each(function () {
        var name = $(this).find(".project-name").val();
        var level = $(this).find(".project-level").val();
        var fromTime = $(this).find(".project-from").val();
        var toTime = $(this).find(".project-to").val();
        var projectDescription = $(this).find(".project-desc").val();
        var myWork = $(this).find(".project-mywork").val();

        if (name != "" && level != "0" && fromTime != "" && toTime != "" && myWork != "") {
            var data_json = {
                "name": name,
                "level": level,
                "fromTime": fromTime,
                "toTime": toTime,
                "projectDescription": projectDescription,
                "myWork": myWork
            };
            submit_data.push(data_json);
        } else {
            alert("请将必填信息填写完整！");
            tag = false;
            return false;//跳出本次循环
        }
    });

    //填写信息不完整，tag=false
    if (!tag) {
        return false;
    }

    var url="/api/user/user-message/experience";
    $.ajax({
        type:'post',
        url:url,
        contentType:'application/json;charset=utf-8',
        data: JSON.stringify({
            "experience": submit_data.toJSON
        }),
        success:function (data) {
            if (data.result == true) {
                flag = true;
            } else {
                alert(data.message);
                flag = false;
            }
        }
    });
    return true;
}

//第四个页面提交
function infoSubmit_4() {
    return true;
    var submit_data = new Array();
    var flag = false; //标记后台是否正常接收
    var tag = true;//信息是否填写完整
    $(".career").each(function () {
        var companyName = $(this).find(".career-name").val();
        var companyQuality = $(this).find(".career-quality").val();
        var companyLevel = $(this).find(".career-level").val();
        var job = $(this).find(".career-job").val();
        var fromTime = $(this).find(".career-from").val();
        var toTime = $(this).find(".career-to").val();
        var description = $(this).find(".career-desc").val();
        if (companyName != "" && companyQuality != "0" && companyLevel != "0" && job != "" && fromTime != "" && toTime != "") {
            var data_json = {
                "Companyname": companyName,
                "companyQuality": companyQuality,
                "companyLevel": companyLevel,
                "job": job,
                "fromTime": fromTime,
                "toTime": toTime,
                "description": description,
            }
            submit_data.push(data_json);
        } else {
            alert("请将必填信息填写完整！");
            tag = false;
            return false;
        }
    });
    //填写信息不完整，tag=false
    if (!tag) {
        return false;
    }

    var url="/api/user/user-message/jobExperience";
    $.ajax({
        type:'post',
        url:url,
        contentType:'application/json;charset=utf-8',
        data: JSON.stringify({
            "jobExperience": submit_data.toJSON
        }),
        success:function (data) {
            if (data.result == true) {
                flag = true;
            } else {
                alert(data.message);
                flag = false;
            }
        }
    });
    return true;
}

//第五个页面提交
function infoSubmit_5() {
    return true;
    var submit_data = new Array();
    var tag = true;//信息是否填完整
    var flag = false;//是否能跳转下个页面
    $(".skill").each(function () {
        var skillName = $(this).find(".skill-name").val();
        var degree = $(this).find(".skill-degree").val();
        var certification = $(this).find(".skill-certificate").val();
        var description = $(this).find(".skill-desc").val();
        if (skillName != "" && degree != "0") {
            var data_json = {
                "skillName": skillName,
                "degree": degree,
                "certificate": certification,
                "description": description
            };
            submit_data.push(data_json);
        }else {
            alert("请将必填信息填写完整！");
            tag = false;
            return false;//退出循环。而非退出函数
        }
    });

    //填写信息不完整，tag=false
    if (!tag)
        return false;

    var url="/api/user/user-message/skill";
    $.ajax({
        type:'post',
        url:url,
        contentType:'application/json;charset=utf-8',
        data: JSON.stringify({
            "skill": submit_data.toJSON
        }),
        success:function (data) {
            if (data.result == true) {
                flag = true;
            } else {
                alert(data.message);
                flag = false;
            }
        }
    });
    return flag;
}

//第六个页面的提交
function infoSubmit_6() {
    var salary = $("#expect-salary").val();
    var location = $("#expect-city").val();
    var companyQuality = $("#expect-quality").val();
    var companyLevel = $("#expect-level").val();
    var jobType = $("#expect-type").val();
    var description = $("#expect-desc").val();
    var flag = false;
    if (salary != "" && location != null && companyLevel != null && companyQuality != null &&jobType != "") {
        var submit_data = {
            "salary": salary,
            "location": location,
            "companyQuality": companyQuality,
            "companyLevel": companyLevel,
            "jobType": jobType,
            "description": description
        }
        var url = "/api/user/user-message/expectation";
        $.ajax({
            type:'post',
            url:url,
            contentType:'application/json;charset=utf-8',
            data: JSON.stringify(submit_data),
            success:function (data) {
                if (data.result == true) {
                    flag = true;
                } else {
                    alert(data.message);
                    flag = false;
                }
            }
        });
        return flag;
    } else {
        alert("请将必填信息填写完整！");
        return false;
    }
}

//删除动态添加的元素，id表示触发事件的元素， count表示需要删除的父元素相对当前元素的层数
function removeAdd(id, count) {
    var parent = id.parentNode;
    for (var i=0; i < count-1; i++)
         var parent = parent.parentNode;
    parent.remove();
}







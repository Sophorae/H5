function Report() {
    this.trimPhoneNumber = function(value) {
        value = value.replace(/[^\d]/g, "");
        return value.length > 7 ? value.substr(0, 3) + " " + value.substr(3, 4) + " " + value.substr(7) : value.length > 3 ? value.substr(0, 3) + " " + value.substr(3) : value;
    }

    this.messagesShow = function(message) {
        this.messageText.text(message);
        this.messageBox.stop(true).fadeIn(200).delay(1000).fadeOut(200);
    }

    this.handleGetCode = function(res) {
        if(res && this.canGetCode) {
            let s = 10;
            this.canGetCode = false;
            this.getCode.text(s + "s后重发").addClass("active");
            this.timer = setInterval(function() {
                this.getCode.text(--s + "s后重发")
                s == 0 && this.getCode.text("再次发送").removeClass("active") && (this.canGetCode = true) && clearInterval(this.timer);
            }.bind(this), 1000)
        }
    }

    this.handleSubmit = function(res) {
        if (true) {
            this.popup.show();
            this.body.addClass("active")
        }
    }
    
    this.handleRes = function(handle) {
        switch (handle) {
            case this.HANDLE.GETCODE: return $.proxy(this.handleGetCode, this);
            case this.HANDLE.SUBMIT: return $.proxy(this.handleSubmit, this);
            default: "";
        }
    }

    this.handleAjax = function(url, data, handle) {
        $.ajax({
            url: url,
            type: "POST",
            async: true,
            data: data,
            success: this.handleRes(handle)
        })
    }

    this.init = function() {
        this.HANDLE = {
            GETCODE: "getCode",
            SUBMIT: "submit"
        }
        this.ERROR = {
            REASONERROR: "请选择举报原因",
            PHONEERROR: "请输入正确的手机号码",
            CODEERROR: "请填写填写验证码"
        }
        this.checkPhone = new RegExp("^1\\d{10}$");
        this.timer = null;
        this.resetClassName = "";
        this.phone = "";
        this.canGetCode = true;
        this.historyBack = $(".return");
        this.messageText = $(".message-text");
        this.messageBox = $(".message-box");
        this.phoneBox = $(".phone-box");
        this.phoneInput = $("#phone");
        this.codeBox = $(".code-box");
        this.codeInput = $("#code");
        this.reset = $(".reset");
        this.resetPhone = $(".reset-phone");
        this.resetCode = $(".reset-code");
        this.getCode = $(".get-code");
        this.otherInput = $("#other");
        this.count = $(".count");
        this.submit = $("#report-submit");
        this.checkedReason = $("input[name='reason']");
        this.reason = "";
        this.code = "";
        this.other = "";
        this.body = $("html, body");
        this.popup = $(".popup");
        this.popupClose = $(".popup-close");

        return this;
    }

    this.logic = function() {
        this.historyBack.on("click", function() {
            history.go(-1);
        })

        this.phoneInput.on("input", $.proxy(function() {
            this.phoneInput.val(this.trimPhoneNumber(this.phoneInput.val()));
            this.phoneInput.val().length > 0 ? this.resetPhone.show() : this.resetPhone.hide();
            this.phoneInput.val().length == 13 && this.codeBox.show() && this.phoneBox.addClass("active");
        }, this))

        this.codeInput.on("input", $.proxy(function() {
            this.codeInput.val().length > 0 ? this.resetCode.show() : this.resetCode.hide();
        }, this))

        this.reset.on("click", $.proxy(function(e) {
            this.resetClassName = $(e.target || e.srcElement).hide().attr("class");
            switch (this.resetClassName) {
                case "reset reset-phone": this.phoneInput.val(""); break;
                case "reset reset-code": this.codeInput.val(""); break;
                default: "";
            }
        }, this))

        this.getCode.on("click", $.proxy(function() {
            this.phone = this.phoneInput.val().replace(/\s/g, "");
            this.checkPhone.test(this.phone) ? this.handleAjax(url, {phone: this.phone}, this.HANDLE.GETCODE) : this.canGetCode && this.messagesShow(this.ERROR.PHONEERROR);
        }, this))

        this.otherInput.on("input", $.proxy(function() {
            this.count.text(this.otherInput.val().length);
        }, this))

        this.submit.on("click", $.proxy(function() {
            if (!this.checkedReason.is(":checked")) {
                this.messagesShow(this.ERROR.REASONERROR);
                return false;
            } else {
                this.reason = this.checkedReason.filter(":checked").eq(0).val();
            }
            this.phone = this.phoneInput.val().replace(/\s/g, "");
            if (!this.checkPhone.test(this.phone)) {
                this.messagesShow(this.ERROR.PHONEERROR);
                return false;
            }
            if (this.codeInput.val() == "") {
                this.messagesShow(this.ERROR.CODEERROR);
                return false;
            } else {
                this.code = this.codeInput.val();
            }
            this.other = this.otherInput.val();
            this.handleAjax(url, {
                reason: this.reason,
                phone: this.phone,
                code: this.code,
                other: this.other
            }, this.HANDLE.SUBMIT)
        }, this))

        this.popupClose.on("click", $.proxy(function() {
            this.popup.hide();
            this.body.removeClass("active");
        }, this))
    }
}
$(function() {
    new Report().init().logic();
})
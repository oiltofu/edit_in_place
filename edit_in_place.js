/*
 *就地编辑组件
 *created by lin
 *2016-8-23
 *每个人都有保持代码优雅的责任
 */

function EditInPlaceField(id,parent,value) {
    this.id = id;
    this.value = value || 'default value';
    this.containerElement = null;
    this.parentElement = parent;
    this.createElements(this.id);
    //绑定事件
    this.attachEvents();
}

EditInPlaceField.prototype = {
    createElements: function(id) {
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);

        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML= this.value;

        //创建input
        this.fieldElement = document.createElement('input');
        //类型为文本框
        this.fieldElement.type = "text";
        //值为无名氏
        this.fieldElement.value = this.value;
        //添加到containerElement
        this.containerElement.appendChild(this.fieldElement);

        //创建保存按钮
        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = "保存";
        this.containerElement.appendChild(this.saveButton);

        //创建取消按钮
        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value = '取消';
        this.containerElement.appendChild(this.cancelButton);

        this.convertToText();
    },
    //将编辑框及按钮隐藏起来，只显示文本状态
    convertToText: function() {
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display= 'inline';
        this.setValue(this.value);
    },
    attachEvents: function() {
        var that = this;
        this.staticElement.addEventListener("click",function() {
            //将状态切换为编辑状态
            that.convertToEditable();
        },false);

        //将编辑状态切换到文本状态
        this.cancelButton.addEventListener("click",function() {
            that.cancel();
        },false);

        this.saveButton.addEventListener("click",function() {
            that.save();
        },false);
    },
    convertToEditable: function() {
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';

        this.setValue(this.value);
    },
    setValue: function(value) {
        this.fieldElement.value = value;
        this.staticElement.innerHTML = value;
    },
    cancel: function() {
        this.convertToText();
    },
    save: function() {
        this.value = this.getValue();
        this.convertToText();
    },
    getValue: function() {
        return this.fieldElement.value;
    }
}
